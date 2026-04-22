import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';

import { cotizacionesMockInterceptor } from './cotizaciones-mock.interceptor';

/**
 * Trazabilidad: `openspec/specs/cotizaciones-ui/spec.md` — Requirement: Errores de API…
 * (mock dev documentado); catálogo filas **#4**, **#6**.
 */
describe('cotizacionesMockInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const snapshot = { ...environment };

  beforeEach(() => {
    environment.production = false;
    environment.apiUrl = '/api';
    environment.useCotizacionesMock = true;
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([cotizacionesMockInterceptor])),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    Object.assign(environment, snapshot);
  });

  it('responde a GET /api/cotizaciones con cuerpo mock cuando la bandera está activa', (done) => {
    http.get<Array<{ titulo: string }>>('/api/cotizaciones').subscribe((body) => {
      expect(Array.isArray(body)).toBeTrue();
      expect(body.length).toBe(2);
      expect(body[0].titulo).toContain('demostración');
      done();
    });
  });

  it('no intercepta GET cuando useCotizacionesMock es false', (done) => {
    environment.useCotizacionesMock = false;
    http.get<string[]>('/api/cotizaciones').subscribe((body) => {
      expect(body).toEqual([]);
      done();
    });
    const req = httpMock.expectOne('/api/cotizaciones');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
