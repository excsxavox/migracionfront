import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesReadmeComponent } from './cotizaciones-readme.component';

/**
 * Trazabilidad OpenSpec:
 * - openspec/specs/cotizaciones-ui/spec.md — Requirement: Rutas satélite del módulo (**#5**)
 * - openspec/changes/migracion-react-a-angular/migration-catalog.md — **#5**
 */
describe('CotizacionesReadmeComponent', () => {
  let fixture: ComponentFixture<CotizacionesReadmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizacionesReadmeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CotizacionesReadmeComponent);
    fixture.detectChanges();
  });

  it('renders heading and scope section (cotizaciones-ui / #5)', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#readme-heading')?.textContent?.trim()).toBe('Acerca del módulo');
    expect(el.textContent).toContain('Qué puedes hacer');
  });
});
