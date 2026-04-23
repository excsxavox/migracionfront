/**
 * Bootstrap de la aplicación (**#4**): HTTP, router, tokens de `environment`,
 * interceptors globales (p. ej. mock de cotizaciones en dev; implementación en **#6**).
 */
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { environment } from '../environments/environment';
import { COTIZACIONES_PORT } from './core/ports/cotizaciones.port';
import { API_BASE_URL } from './core/tokens/api-base-url.token';
import { CotizacionesHttpAdapter } from './infrastructure/adapters/cotizaciones.http-adapter';
import { cotizacionesMockInterceptor } from './infrastructure/interceptors/cotizaciones-mock.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([cotizacionesMockInterceptor])),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    { provide: COTIZACIONES_PORT, useClass: CotizacionesHttpAdapter }
  ]
};
