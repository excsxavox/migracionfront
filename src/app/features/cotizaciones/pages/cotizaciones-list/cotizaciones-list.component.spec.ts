import { ComponentFixture, TestBed } from '@angular/core/testing';
/**
 * Trazabilidad OpenSpec:
 * - `openspec/specs/cotizaciones-ui/spec.md` — Requirement: Listado con estados explícitos (destino actual)
 */
import { NEVER, Observable, of, throwError } from 'rxjs';

import { CotizacionVm } from '../../../../core/models/cotizacion.vm';
import { COTIZACIONES_PORT } from '../../../../core/ports/cotizaciones.port';
import { CotizacionesListComponent } from './cotizaciones-list.component';

describe('CotizacionesListComponent', () => {
  let fixture: ComponentFixture<CotizacionesListComponent>;

  const sample: CotizacionVm[] = [{ id: '1', titulo: 'Uno', estado: 'borrador' }];

  function setup(port: { listar: () => Observable<CotizacionVm[]> }) {
    TestBed.configureTestingModule({
      imports: [CotizacionesListComponent],
      providers: [{ provide: COTIZACIONES_PORT, useValue: port }]
    });
    fixture = TestBed.createComponent(CotizacionesListComponent);
    fixture.detectChanges();
  }

  it('should show items on success', () => {
    setup({ listar: () => of(sample) });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Uno');
    expect(el.textContent).toContain('borrador');
  });

  it('should show error and retry', () => {
    setup({ listar: () => throwError(() => new Error('fallo')) });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('fallo');
    const btn = el.querySelector('button');
    expect(btn).toBeTruthy();
  });

  it('should show loading state while request is in flight', () => {
    setup({ listar: () => NEVER });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Cargando');
    expect(el.querySelector('[role="status"][aria-live="polite"]')).toBeTruthy();
  });

  it('should show empty state when API returns no items', () => {
    setup({ listar: () => of([]) });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('No hay cotizaciones');
    expect(el.textContent).not.toContain('Cargando');
  });

  it('should load data after retry following an error', () => {
    let calls = 0;
    setup({
      listar: () => {
        calls += 1;
        return calls === 1 ? throwError(() => new Error('fallo')) : of(sample);
      }
    });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('fallo');
    (el.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.textContent).toContain('Uno');
  });
});
