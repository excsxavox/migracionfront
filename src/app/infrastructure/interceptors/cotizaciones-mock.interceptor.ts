import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';

function joinBaseAndPath(base: string, relativePath: string): string {
  const trimmedBase = base.replace(/\/$/, '');
  const trimmedPath = relativePath.replace(/^\//, '');
  return `${trimmedBase}/${trimmedPath}`;
}

function matchesCotizacionesList(url: string): boolean {
  const expected = joinBaseAndPath(
    environment.apiUrl,
    environment.cotizacionesListRelativePath
  ).replace(/\/$/, '');
  const normalized = url.replace(/\/$/, '');
  const rel = environment.cotizacionesListRelativePath.replace(/^\//, '').replace(/\/$/, '');
  return normalized === expected || normalized.endsWith(`/${rel}`);
}

/**
 * Dev-only: responde a GET `{apiUrl}{cotizacionesListRelativePath}` con datos de demostración cuando no hay backend.
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
