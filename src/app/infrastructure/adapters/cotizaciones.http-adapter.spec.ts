/**
 * Trazabilidad OpenSpec:
 * - `openspec/specs/cotizaciones-ui/spec.md` — Requirement: Contratos HTTP asumidos existentes (normalización y errores observables vía mensaje)
 */
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { API_BASE_URL } from '../../core/tokens/api-base-url.token';
import { CotizacionesHttpAdapter } from './cotizaciones.http-adapter';

describe('CotizacionesHttpAdapter (cotizaciones-ui / HTTP contract)', () => {
  let adapter: CotizacionesHttpAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CotizacionesHttpAdapter,
        { provide: API_BASE_URL, useValue: 'https://api.example.test' }
      ]
    });
    adapter = TestBed.inject(CotizacionesHttpAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('maps a flat array response', (done) => {
    adapter.listar().subscribe((list) => {
      expect(list.length).toBe(1);
      expect(list[0].id).toBe('q-1');
      expect(list[0].titulo).toBe('Cotización anónima');
      expect(list[0].estado).toBe('borrador');
      done();
    });
    const req = httpMock.expectOne('https://api.example.test/cotizaciones');
    req.flush([
      { id: 'q-1', titulo: 'Cotización anónima', estado: 'borrador' }
    ]);
  });

  it('maps wrapped { data: [] } response', (done) => {
    adapter.listar().subscribe((list) => {
      expect(list.length).toBe(1);
      expect(list[0].titulo).toBe('Segunda');
      done();
    });
    const req = httpMock.expectOne('https://api.example.test/cotizaciones');
    req.flush({ data: [{ id: '2', title: 'Segunda', estado: 'enviada' }] });
  });

  it('errors when body shape is unexpected', (done) => {
    adapter.listar().subscribe({
      next: () => done.fail('expected error'),
      error: (e: Error) => {
        expect(e.message).toContain('formato');
        done();
      }
    });
    const req = httpMock.expectOne('https://api.example.test/cotizaciones');
    req.flush({ notData: [] });
  });

  it('maps HTTP error to user-facing message', (done) => {
    adapter.listar().subscribe({
      next: () => done.fail('expected error'),
      error: (e: Error) => {
        expect(e.message.length).toBeGreaterThan(0);
        done();
      }
    });
    const req = httpMock.expectOne('https://api.example.test/cotizaciones');
    req.flush('fail', { status: 503, statusText: 'Service Unavailable' });
  });
});
