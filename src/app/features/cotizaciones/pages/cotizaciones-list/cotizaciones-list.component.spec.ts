import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';

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
});
