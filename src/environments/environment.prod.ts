/**
 * Producción — catálogo migración **#4**. Sin mocks de API en bundle de producción.
 */
export const environment = {
  production: true,
  /**
   * URL base del API en el despliegue (mismo origen relativo o absoluto según gateway).
   * No incluir secretos ni tokens en el cliente.
   */
  apiUrl: '/api',
  cotizacionesListRelativePath: '/cotizaciones',
  useCotizacionesMock: false
};
