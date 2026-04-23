import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { CotizacionVm } from '../../core/models/cotizacion.vm';
import { CotizacionesPort } from '../../core/ports/cotizaciones.port';
import { API_BASE_URL } from '../../core/tokens/api-base-url.token';
import { COTIZACIONES_LIST_RELATIVE_PATH } from '../../core/tokens/cotizaciones-list-path.token';
import { mapHttpErrorToMessage } from '../http/http-error.mapper';

function joinBaseAndPath(base: string, relativePath: string): string {
  const trimmedBase = base.replace(/\/$/, '');
  const trimmedPath = relativePath.replace(/^\//, '');
  return `${trimmedBase}/${trimmedPath}`;
}

/**
 * Adaptador HTTP (**#3**): único acoplamiento al contrato real; path y DTO alineables al legado.
 */
@Injectable()
export class CotizacionesHttpAdapter implements CotizacionesPort {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly listRelativePath = inject(COTIZACIONES_LIST_RELATIVE_PATH);

  listar(): Observable<CotizacionVm[]> {
    const url = joinBaseAndPath(this.apiBaseUrl, this.listRelativePath);
    return this.http.get<unknown>(url).pipe(
      map((body) => this.normalizeList(body)),
      catchError((err) => throwError(() => new Error(mapHttpErrorToMessage(err))))
    );
  }

  private normalizeList(body: unknown): CotizacionVm[] {
    if (Array.isArray(body)) {
      return body.map((item, index) => this.normalizeItem(item, index));
    }
    if (body && typeof body === 'object') {
      const record = body as Record<string, unknown>;
      const nested = this.tryArrayFromWrapper(record);
      if (nested) {
        return nested.map((item, index) => this.normalizeItem(item, index));
      }
    }
    throw new Error('La respuesta del servidor no tiene el formato esperado.');
  }

  /** Soporta `{ data: [] }`, `{ results: [] }` y anidación superficial `data.items`. */
  private tryArrayFromWrapper(record: Record<string, unknown>): unknown[] | null {
    const directKeys = ['data', 'results', 'items', 'cotizaciones'] as const;
    for (const key of directKeys) {
      const value = record[key];
      if (Array.isArray(value)) {
        return value;
      }
    }
    const data = record['data'];
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const inner = data as Record<string, unknown>;
      for (const key of ['items', 'results', 'cotizaciones'] as const) {
        const value = inner[key];
        if (Array.isArray(value)) {
          return value;
        }
      }
    }
    return null;
  }

  private normalizeItem(item: unknown, index: number): CotizacionVm {
    if (item && typeof item === 'object') {
      const o = item as Record<string, unknown>;
      const id = String(o['id'] ?? o['_id'] ?? index);
      const titulo = String(
        o['titulo'] ?? o['title'] ?? o['nombre'] ?? o['name'] ?? 'Sin título'
      );
      const estado = o['estado'] != null ? String(o['estado']) : undefined;
      return { id, titulo, estado };
    }
    return { id: String(index), titulo: 'Elemento sin detalle' };
  }
}
