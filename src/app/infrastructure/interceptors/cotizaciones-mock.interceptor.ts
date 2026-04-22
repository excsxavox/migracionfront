import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';

function matchesCotizacionesList(url: string): boolean {
  const base = environment.apiUrl.replace(/\/$/, '');
  const normalized = url.replace(/\/$/, '');
  return normalized === `${base}/cotizaciones` || normalized.endsWith('/cotizaciones');
}

/**
 * Dev-only: responde a GET …/cotizaciones con datos de demostración cuando no hay backend.
 * Activar con `environment.useCotizacionesMock` (sin secretos).
 */
export const cotizacionesMockInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    !environment.useCotizacionesMock ||
    environment.production ||
    req.method !== 'GET' ||
    !matchesCotizacionesList(req.url)
  ) {
    return next(req);
  }

  const body = [
    { id: 'demo-1', titulo: 'Cotización de demostración (mock)', estado: 'borrador' },
    { id: 'demo-2', titulo: 'Otra cotización de demostración (mock)', estado: 'enviada' }
  ];
  return of(new HttpResponse({ status: 200, body }));
};
