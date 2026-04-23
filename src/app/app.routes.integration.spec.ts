import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

/**
 * Trazabilidad OpenSpec:
 * - openspec/specs/frontend-shell/spec.md — Scenario: Raíz redirige a cotizaciones
 * - openspec/changes/migracion-react-a-angular/migration-catalog.md — **#1** (shell / routing)
 */
describe('routes (integration)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('redirects / to /cotizaciones', async () => {
    TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    expect(router.url).toBe('/cotizaciones');
  });

  it('resolves unknown paths to shell and cotizaciones', async () => {
    TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/no-such-path');
    expect(router.url).toBe('/cotizaciones');
  });
});
