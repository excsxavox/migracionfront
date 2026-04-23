import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CotizacionesHttpAdapter } from './cotizaciones.http-adapter';
import { API_BASE_URL } from '../../core/tokens/api-base-url.token';
import { COTIZACIONES_LIST_RELATIVE_PATH } from '../../core/tokens/cotizaciones-list-path.token';

/**
 * Trazabilidad OpenSpec:
 * - openspec/changes/migracion-react-a-angular/migration-catalog.md — **#3**
 * - openspec/specs/cotizaciones-ui/spec.md — contratos HTTP / listado
 */
describe('CotizacionesHttpAdapter', () => {
  let adapter: CotizacionesHttpAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CotizacionesHttpAdapter,
        { provide: API_BASE_URL, useValue: '/api' },
        { provide: COTIZACIONES_LIST_RELATIVE_PATH, useValue: '/cotizaciones' }
      ]
    });
    adapter = TestBed.inject(CotizacionesHttpAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('GET joins api base and relative path', () => {
    adapter.listar().subscribe();
    const req = httpMock.expectOne('/api/cotizaciones');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('normalizes plain array', (done) => {
    adapter.listar().subscribe((list) => {
      expect(list.length).toBe(1);
      expect(list[0].id).toBe('1');
      expect(list[0].titulo).toBe('A');
      expect(list[0].estado).toBe('x');
      done();
    });
    const req = httpMock.expectOne('/api/cotizaciones');
    req.flush([{ id: '1', titulo: 'A', estado: 'x' }]);
  });

  it('normalizes { data: [] }', (done) => {
    adapter.listar().subscribe((list) => {
      expect(list.length).toBe(1);
      expect(list[0].titulo).toBe('B');
      done();
    });
    httpMock.expectOne('/api/cotizaciones').flush({ data: [{ titulo: 'B' }] });
  });

  it('normalizes { results: [] }', (done) => {
    adapter.listar().subscribe((list) => {
      expect(list.length).toBe(1);
      expect(list[0].titulo).toBe('C');
      done();
    });
    httpMock.expectOne('/api/cotizaciones').flush({ results: [{ titulo: 'C' }] });
  });

  it('normalizes { data: { items: [] } }', (done) => {
    adapter.listar().subscribe((list) => {
      expect(list.length).toBe(1);
      expect(list[0].titulo).toBe('D');
      done();
    });
    httpMock.expectOne('/api/cotizaciones').flush({ data: { items: [{ titulo: 'D' }] } });
  });

  it('errors on unexpected shape', (done) => {
    adapter.listar().subscribe({
      next: () => fail('expected error'),
      error: (e: Error) => {
        expect(e.message).toContain('formato');
        done();
      }
    });
    httpMock.expectOne('/api/cotizaciones').flush({ foo: 'bar' });
  });
});
