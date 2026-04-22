import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, NEVER, of, throwError } from 'rxjs';

import { CotizacionVm } from '../../../../core/models/cotizacion.vm';
import { COTIZACIONES_PORT } from '../../../../core/ports/cotizaciones.port';
import { CotizacionesListComponent } from './cotizaciones-list.component';

/**
 * Trazabilidad: `openspec/specs/cotizaciones-ui/spec.md` — Requirement: Listado con estados explícitos…
 * Scenarios: Carga inicial, Error, Lista vacía, Datos mostrados; catálogo filas **#2**, **#6**.
 */
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

  it('muestra carga mientras la petición no termina', () => {
    setup({ listar: () => NEVER });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Cargando');
    expect(el.querySelector('[role="status"]')).toBeTruthy();
  });

  it('muestra filas cuando el puerto devuelve datos', () => {
    setup({ listar: () => of(sample) });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Uno');
    expect(el.textContent).toContain('borrador');
    expect(el.textContent).not.toContain('Cargando');
  });

  it('muestra vacío sin error cuando la lista está vacía', () => {
    setup({ listar: () => of([]) });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('No hay cotizaciones');
    expect(el.textContent).not.toContain('Cargando');
  });

  it('muestra error con Reintentar y recupera tras reintento', () => {
    let calls = 0;
    setup({
      listar: () => {
        calls += 1;
        if (calls === 1) {
          return throwError(
            () => new Error('No se pudo conectar con el servidor. Comprueba la red o el proxy de desarrollo.')
          );
        }
        return of(sample);
      }
    });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('No se pudo conectar');
    const btn = el.querySelector('button');
    expect(btn?.textContent).toContain('Reintentar');
    btn?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(el.textContent).toContain('Uno');
    expect(calls).toBe(2);
  });
});
