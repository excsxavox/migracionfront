import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';

/**
 * Trazabilidad OpenSpec:
 * - openspec/specs/frontend-shell/spec.md — Requirement: Shell accesible y punto de entrada a cotizaciones
 * - openspec/changes/migracion-react-a-angular/migration-catalog.md — **#1** (shell)
 */
@Component({
  selector: 'app-shell-test-child',
  standalone: true,
  template: '<span data-testid="outlet-child">child</span>'
})
class ShellTestChildComponent {}

const shellTestRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'cotizaciones' },
      { path: 'cotizaciones', component: ShellTestChildComponent }
    ]
  }
];

describe('MainLayoutComponent', () => {
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent, RouterOutlet, ShellTestChildComponent],
      providers: [provideRouter(shellTestRoutes)]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    fixture.detectChanges();
  });

  it('renders skip link to main landmark (frontend-shell / #1)', () => {
    const el: HTMLElement = fixture.nativeElement;
    const skip = el.querySelector<HTMLAnchorElement>('a.skip-link');
    expect(skip?.getAttribute('href')).toBe('#main-content');
    expect(skip?.textContent?.trim()).toContain('Saltar');
  });

  it('exposes main landmark with router-outlet (frontend-shell / #1)', () => {
    const el: HTMLElement = fixture.nativeElement;
    const main = el.querySelector('main#main-content');
    expect(main).toBeTruthy();
    expect(main?.querySelector('router-outlet')).toBeTruthy();
  });

  it('has principal nav link to cotizaciones (frontend-shell / #1)', () => {
    const el: HTMLElement = fixture.nativeElement;
    const nav = el.querySelector('nav[aria-label="Principal"]');
    expect(nav).toBeTruthy();
    const home = nav?.querySelector<HTMLAnchorElement>('a[routerLink="/cotizaciones"]');
    expect(home?.textContent?.trim()).toContain('Inicio');
  });

  it('has semantic footer (frontend-shell / #1)', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('footer[role="contentinfo"]')).toBeTruthy();
  });
});
