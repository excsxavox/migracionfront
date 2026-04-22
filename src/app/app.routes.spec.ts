/**
 * Trazabilidad OpenSpec:
 * - `openspec/specs/frontend-shell/spec.md` — Requirement: Shell accesible… / Scenario: Raíz redirige a cotizaciones
 */
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterOutlet, provideRouter } from '@angular/router';
import { Router } from '@angular/router';

import { routes } from './app.routes';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
class RouteTestHost {}

describe('App routes (frontend-shell)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteTestHost],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('redirects empty path to /cotizaciones', async () => {
    const fixture = TestBed.createComponent(RouteTestHost);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    await router.navigateByUrl('/');
    await fixture.whenStable();
    expect(router.url).toBe('/cotizaciones');
  });

  it('redirects unknown paths to /cotizaciones via shell', async () => {
    const fixture = TestBed.createComponent(RouteTestHost);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    await router.navigateByUrl('/no-existe');
    await fixture.whenStable();
    expect(router.url).toBe('/cotizaciones');
  });
});
