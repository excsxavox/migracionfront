/**
 * Trazabilidad OpenSpec:
 * - `openspec/specs/frontend-shell/spec.md` — Requirement: Shell accesible… / Scenario: Navegación por teclado (enlaces presentes)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent (frontend-shell)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('renders skip link, brand, and main landmark', () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.skip-link')).toBeTruthy();
    expect(el.querySelector('header[role="banner"]')).toBeTruthy();
    expect(el.querySelector('main#main-content')).toBeTruthy();
    expect(el.querySelector('a.app-brand')).toBeTruthy();
    expect(el.querySelector('nav[aria-label="Principal"]')).toBeTruthy();
  });
});
