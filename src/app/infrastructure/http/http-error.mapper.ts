import { HttpErrorResponse } from '@angular/common/http';

export function mapHttpErrorToMessage(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) {
      return 'No se pudo conectar con el servidor. Comprueba la red o el proxy de desarrollo.';
    }
    if (err.error && typeof err.error === 'object' && 'message' in err.error) {
      const m = (err.error as { message?: unknown }).message;
      if (typeof m === 'string' && m.trim()) {
        return m;
      }
    }
    if (typeof err.error === 'string' && err.error.trim()) {
      return err.error;
    }
    return `Error ${err.status}: ${err.statusText || 'solicitud fallida'}`;
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return 'Ha ocurrido un error inesperado.';
}
