/**
 * Entorno por defecto (desarrollo local).
 * En build de producción, `environment.prod.ts` sustituye este fichero (véase `angular.json`).
 */
export const environment = {
  production: false,
  /** Base URL de API; en local suele ir detrás de `proxy.conf.json` (p. ej. `/api`). */
  apiUrl: '/api',
  /**
   * Si es true y no es producción, un interceptor devuelve datos de demostración para
   * GET `{apiUrl}/cotizaciones` cuando no hay backend. Desactivar al usar API real.
   */
  useCotizacionesMock: true
};
