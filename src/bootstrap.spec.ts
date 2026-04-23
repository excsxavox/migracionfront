import { TestBed } from '@angular/core/testing';

import angularJson from '../angular.json';
import proxyConf from '../proxy.conf.json';
import { appConfig } from './app/app.config';
import { API_BASE_URL } from './app/core/tokens/api-base-url.token';
import { environment as environmentDev } from './environments/environment';
import { environment as environmentProd } from './environments/environment.prod';

/**
 * Contrato observable de bootstrap global — catálogo migración **#4**.
 *
 * Trazabilidad OpenSpec:
 * - openspec/changes/migracion-react-a-angular/specs/frontend-shell/spec.md
 *   — Requirement: Coherencia de bootstrap de aplicación (**#4**)
 *   — Requirement: Documento HTML y estilos globales alineados al shell (**#4**) (runtime + JSON;
 *     HTML/CSS estáticos: `npm run verify:bootstrap`)
 * - openspec/changes/migracion-react-a-angular/migration-catalog.md — fila **#4**
 */
describe('bootstrap (#4) — environments, proxy wiring, app.config', () => {
  it('development environment exposes apiUrl and mock flag (Scenario: entorno dev)', () => {
    expect(environmentDev.production).toBe(false);
    expect(environmentDev.apiUrl).toBe('/api');
    expect(environmentDev.useCotizacionesMock).toBe(true);
  });

  it('production environment disables mock (Scenario: producción sin mock)', () => {
    expect(environmentProd.production).toBe(true);
    expect(environmentProd.useCotizacionesMock).toBe(false);
  });

  it('proxy.conf.json maps /api with pathRewrite (Scenario: proxy dev)', () => {
    const api = (proxyConf as Record<string, { pathRewrite?: Record<string, string> }>)['/api'];
    expect(api).toBeDefined();
    expect(api.pathRewrite).toEqual({ '^/api': '' });
  });

  it('angular.json uses environment.prod in production build and dev proxy on serve', () => {
    const projects = (angularJson as { projects: Record<string, unknown> }).projects;
    const migracionfront = projects['migracionfront'] as {
      architect: {
        build: { configurations: { production: { fileReplacements?: { replace: string; with: string }[] } } };
        serve: { configurations: { development: { proxyConfig?: string } } };
        test: { options: { styles?: string[]; assets?: { input?: string }[] } };
      };
    };
    const replacements =
      migracionfront.architect.build.configurations.production.fileReplacements ?? [];
    expect(
      replacements.some(
        (r) => r.replace.includes('environment.ts') && r.with.includes('environment.prod.ts')
      )
    ).toBe(true);
    expect(migracionfront.architect.serve.configurations.development.proxyConfig).toBe(
      'proxy.conf.json'
    );
    expect(migracionfront.architect.test.options.styles).toContain('src/styles.css');
    const testAssets = migracionfront.architect.test.options.assets ?? [];
    expect(testAssets.some((a) => a.input === 'public')).toBe(true);
  });

  it('app.config registers API_BASE_URL from environment (Scenario: providers bootstrap)', async () => {
    await TestBed.configureTestingModule({
      providers: appConfig.providers
    }).compileComponents();

    expect(TestBed.inject(API_BASE_URL)).toBe(environmentDev.apiUrl);
    const apiBinding = appConfig.providers.find(
      (p): p is { provide: typeof API_BASE_URL; useValue: string } =>
        typeof p === 'object' &&
        p !== null &&
        'provide' in p &&
        (p as { provide: unknown }).provide === API_BASE_URL
    );
    expect(apiBinding?.useValue).toBe('/api');
  });
});
