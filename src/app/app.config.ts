import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { environment } from '../environments/environment';
import { COTIZACIONES_PORT } from './core/ports/cotizaciones.port';
import { API_BASE_URL } from './core/tokens/api-base-url.token';
import { CotizacionesHttpAdapter } from './infrastructure/adapters/cotizaciones.http-adapter';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    { provide: COTIZACIONES_PORT, useClass: CotizacionesHttpAdapter }
  ]
};
