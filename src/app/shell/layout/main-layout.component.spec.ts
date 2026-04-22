import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { MainLayoutComponent } from './main-layout.component';

@Component({ standalone: true, template: '<p id="child">child</p>' })
class StubChildComponent {}

const testRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'stub' },
      { path: 'stub', component: StubChildComponent }
    ]
  }
];

/**
 * Trazabilidad: `openspec/specs/frontend-shell/spec.md` — Requirement: Shell accesible…
 * Scenarios: Navegación por teclado (controles presentes); catálogo fila **#1**.
 */
describe('MainLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent, StubChildComponent],
      providers: [provideRouter(testRoutes)]
    }).compileComponents();
  });

  it('renderiza skip link, cabecera y outlet', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/stub');
    const fixture = harness.fixture;
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.skip-link')?.textContent).toContain('Saltar al contenido');
    expect(root.querySelector('.app-brand')?.textContent).toContain('Cotizaciones');
    expect(root.querySelector('#main-content')).toBeTruthy();
    expect(root.querySelector('#child')?.textContent).toContain('child');
  });
});
