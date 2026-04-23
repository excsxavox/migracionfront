import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { cotizacionesMockInterceptor } from './cotizaciones-mock.interceptor';

/**
 * Trazabilidad OpenSpec:
 * - openspec/specs/cotizaciones-ui/spec.md — Requirement: Errores de API… (mock documentado)
 * - openspec/changes/migracion-react-a-angular/migration-catalog.md — **#6** (mock dev), **#4** (registro)
 */
describe('cotizacionesMockInterceptor', () => {
  const saved = {
    production: environment.production,
    useCotizacionesMock: environment.useCotizacionesMock,
    apiUrl: environment.apiUrl,
    cotizacionesListRelativePath: environment.cotizacionesListRelativePath
  };

  afterEach(() => {
    environment.production = saved.production;
    environment.useCotizacionesMock = saved.useCotizacionesMock;
    environment.apiUrl = saved.apiUrl;
    environment.cotizacionesListRelativePath = saved.cotizacionesListRelativePath;
    TestBed.inject(HttpTestingController).verify();
  });

  function setupClient(): { http: HttpClient; httpMock: HttpTestingController } {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([cotizacionesMockInterceptor])),
        provideHttpClientTesting()
      ]
    });
    return {
      http: TestBed.inject(HttpClient),
      httpMock: TestBed.inject(HttpTestingController)
    };
  }

  it('returns demo list for GET on configured cotizaciones URL when mock is enabled (#6)', (done) => {
    environment.production = false;
    environment.useCotizacionesMock = true;
    environment.apiUrl = '/api';
    environment.cotizacionesListRelativePath = '/cotizaciones';
    const { http, httpMock } = setupClient();

    http.get<unknown[]>('/api/cotizaciones').subscribe((body) => {
      expect(Array.isArray(body)).toBeTrue();
      expect(body.length).toBe(2);
      expect(body[0]).toEqual(
        jasmine.objectContaining({
          id: 'demo-1',
          titulo: 'Cotización de demostración (mock)',
          estado: 'borrador'
        })
      );
      httpMock.verify();
      done();
    });
  });

  it('delegates to backend when mock flag is off (#6)', (done) => {
    environment.production = false;
    environment.useCotizacionesMock = false;
    environment.apiUrl = '/api';
    environment.cotizacionesListRelativePath = '/cotizaciones';
    const { http, httpMock } = setupClient();

    http.get('/api/cotizaciones').subscribe((body) => {
      expect(body).toEqual([{ id: 'from-backend' }]);
      done();
    });

    const req = httpMock.expectOne('/api/cotizaciones');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 'from-backend' }]);
  });

  it('delegates to backend in production even if mock flag is true (#6)', (done) => {
    environment.production = true;
    environment.useCotizacionesMock = true;
    environment.apiUrl = '/api';
    environment.cotizacionesListRelativePath = '/cotizaciones';
    const { http, httpMock } = setupClient();

    http.get('/api/cotizaciones').subscribe((body) => {
      expect(body).toEqual([]);
      done();
    });

    const req = httpMock.expectOne('/api/cotizaciones');
    req.flush([]);
  });

  it('does not intercept non-GET requests to list URL (#6)', (done) => {
    environment.production = false;
    environment.useCotizacionesMock = true;
    environment.apiUrl = '/api';
    environment.cotizacionesListRelativePath = '/cotizaciones';
    const { http, httpMock } = setupClient();

    http.post('/api/cotizaciones', {}).subscribe((body) => {
      expect(body).toEqual({ ok: true });
      done();
    });

    const req = httpMock.expectOne('/api/cotizaciones');
    expect(req.request.method).toBe('POST');
    req.flush({ ok: true });
  });

  it('does not intercept GET to unrelated paths (#6)', (done) => {
    environment.production = false;
    environment.useCotizacionesMock = true;
    environment.apiUrl = '/api';
    environment.cotizacionesListRelativePath = '/cotizaciones';
    const { http, httpMock } = setupClient();

    http.get('/api/otros').subscribe((body) => {
      expect(body).toEqual(['x']);
      done();
    });

    const req = httpMock.expectOne('/api/otros');
    req.flush(['x']);
  });
});
