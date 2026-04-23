/**
 * Entorno por defecto (desarrollo local). Catálogo migración **#4**.
 * En producción, `environment.prod.ts` sustituye este fichero (`angular.json` → fileReplacements).
 */
export const environment = {
  production: false,
  /**
   * Base URL de API. En `ng serve`, las peticiones a esta base pasan por `proxy.conf.json`
   * (p. ej. `/api` → backend en `http://localhost:3000` con pathRewrite según proxy).
   */
  apiUrl: '/api',
  /** Path del listado relativo a `apiUrl` (ajustar tras inventario legado). */
  cotizacionesListRelativePath: '/cotizaciones',
  /**
   * Si es true y no es producción, el interceptor registrado en `app.config.ts` responde a
   * GET `{apiUrl}{cotizacionesListRelativePath}` con datos de demostración. Desactivar al usar API real.
   */
  useCotizacionesMock: true
};
