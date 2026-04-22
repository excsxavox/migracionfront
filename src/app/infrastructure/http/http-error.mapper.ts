import { HttpErrorResponse } from '@angular/common/http';

const HTML_DOCUMENT = /<!doctype|<\s*html[\s>]/i;
const HTML_TAG = /<[a-z][\s\S]*?>/i;

/**
 * Normaliza texto de error del servidor para la UI: no usar documentos HTML
 * ni fragmentos grandes como mensaje principal; recorta longitud.
 */
export function mapHttpErrorToMessage(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) {
      return 'No se pudo conectar con el servidor. Comprueba la red o el proxy de desarrollo.';
    }
    if (err.error && typeof err.error === 'object' && 'message' in err.error) {
      const m = (err.error as { message?: unknown }).message;
      if (typeof m === 'string' && m.trim()) {
        return sanitizeServerMessage(m);
      }
    }
    if (typeof err.error === 'string' && err.error.trim()) {
      return sanitizeServerMessage(err.error);
    }
    return `Error ${err.status}: ${err.statusText || 'solicitud fallida'}`;
  }
  if (err instanceof Error && err.message) {
    return sanitizeServerMessage(err.message);
  }
  return 'Ha ocurrido un error inesperado.';
}

const MAX_MESSAGE_LENGTH = 280;

function sanitizeServerMessage(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return 'Ha ocurrido un error inesperado.';
  }
  if (HTML_DOCUMENT.test(trimmed)) {
    return 'El servidor devolvió una página de error. Comprueba la URL del API o el proxy de desarrollo.';
  }
  if (HTML_TAG.test(trimmed) || trimmed.includes('</')) {
    const textOnly = trimmed.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (textOnly.length < 4 || HTML_TAG.test(textOnly)) {
      return 'No se pudo mostrar el detalle del error. Comprueba la conexión o inténtalo más tarde.';
    }
    return truncateMessage(textOnly);
  }
  return truncateMessage(trimmed);
}

function truncateMessage(s: string): string {
  if (s.length <= MAX_MESSAGE_LENGTH) {
    return s;
  }
  return `${s.slice(0, MAX_MESSAGE_LENGTH - 1)}…`;
}
