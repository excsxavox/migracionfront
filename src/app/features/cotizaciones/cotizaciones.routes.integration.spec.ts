import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AppComponent } from '../../app.component';
import { appConfig } from '../../app.config';

/**
 * Trazabilidad OpenSpec:
 * - openspec/specs/cotizaciones-ui/spec.md — Requirement: Listado con estados explícitos (Scenario: Datos mostrados)
 * - openspec/changes/migracion-react-a-angular/specs/cotizaciones-ui/spec.md — Requirement: Listado bajo ruta lazy y puerto HTTP (**#2**, shell **#1**, contrato **#3**); Scenario: Mock activo (**#4** / **#6**)
 * - openspec/changes/migracion-react-a-angular/migration-catalog.md — **#2**, **#4**, **#6**
 */
describe('cotizaciones lazy route (integration)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [...appConfig.providers]
    }).compileComponents();
  });

  it('loads list at /cotizaciones with demo items when mock is enabled', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/cotizaciones');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Cotización de demostración (mock)');
    expect(el.textContent).toContain('Otra cotización de demostración (mock)');
  });

  it('loads satellite readme at /cotizaciones/acerca (#5)', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/cotizaciones/acerca');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Acerca del módulo');
    expect(el.textContent).toContain('Qué puedes hacer');
  });
});
