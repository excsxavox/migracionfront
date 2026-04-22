import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';

/**
 * Trazabilidad: `openspec/specs/frontend-shell/spec.md` — Requirement: Shell accesible…
 * Scenario: Raíz redirige a cotizaciones; catálogo fila **#1**.
 */
describe('app.routes (shell / entrada)', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)]
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('redirige raíz a /cotizaciones', async () => {
    await router.navigateByUrl('');
    expect(location.path()).toBe('/cotizaciones');
  });

  it('redirige ruta comodín a flujo cotizaciones', async () => {
    await router.navigateByUrl('/no-existe');
    expect(location.path()).toBe('/cotizaciones');
  });
});
