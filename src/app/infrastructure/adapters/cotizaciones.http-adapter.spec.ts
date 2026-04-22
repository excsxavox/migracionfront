import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_BASE_URL } from '../../core/tokens/api-base-url.token';

import { CotizacionesHttpAdapter } from './cotizaciones.http-adapter';

/**
 * Trazabilidad: `openspec/specs/cotizaciones-ui/spec.md` — Requirement: Contratos HTTP…
 * Listado con datos; normalización; catálogo fila **#3**.
 */
describe('CotizacionesHttpAdapter', () => {
  let adapter: CotizacionesHttpAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CotizacionesHttpAdapter, { provide: API_BASE_URL, useValue: '/api' }]
    });
    adapter = TestBed.inject(CotizacionesHttpAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('GET /api/cotizaciones y mapea array plano', (done) => {
    adapter.listar().subscribe((rows) => {
      expect(rows.length).toBe(1);
      expect(rows[0].titulo).toBe('Alpha');
      expect(rows[0].estado).toBe('borrador');
      done();
    });
    const req = httpMock.expectOne('/api/cotizaciones');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 'a1', titulo: 'Alpha', estado: 'borrador' }]);
  });

  it('normaliza envoltura { data: [] }', (done) => {
    adapter.listar().subscribe((rows) => {
      expect(rows.length).toBe(1);
      expect(rows[0].titulo).toBe('Beta');
      done();
    });
    const req = httpMock.expectOne('/api/cotizaciones');
    req.flush({ data: [{ id: 'b1', title: 'Beta' }] });
  });

  it('propaga mensaje legible ante error HTTP (sin HTML crudo)', (done) => {
    adapter.listar().subscribe({
      next: () => fail('expected error'),
      error: (e: Error) => {
        expect(e.message).toContain('página de error');
        expect(e.message).not.toContain('<html');
        done();
      }
    });
    const req = httpMock.expectOne('/api/cotizaciones');
    req.flush('<!DOCTYPE html><html><body>Error</body></html>', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  });
});
