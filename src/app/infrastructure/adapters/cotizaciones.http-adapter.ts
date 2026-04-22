import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { CotizacionVm } from '../../core/models/cotizacion.vm';
import { CotizacionesPort } from '../../core/ports/cotizaciones.port';
import { API_BASE_URL } from '../../core/tokens/api-base-url.token';
import { mapHttpErrorToMessage } from '../http/http-error.mapper';

/** Adaptador HTTP: único punto de acoplamiento al contrato real (ajustar tras inventario legado). */
@Injectable()
export class CotizacionesHttpAdapter implements CotizacionesPort {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  listar(): Observable<CotizacionVm[]> {
    const url = `${this.apiBaseUrl.replace(/\/$/, '')}/cotizaciones`;
    return this.http.get<unknown>(url).pipe(
      map((body) => this.normalizeList(body)),
      catchError((err) => throwError(() => new Error(mapHttpErrorToMessage(err))))
    );
  }

  private normalizeList(body: unknown): CotizacionVm[] {
    if (Array.isArray(body)) {
      return body.map((item, index) => this.normalizeItem(item, index));
    }
    if (body && typeof body === 'object' && 'data' in body) {
      const data = (body as { data?: unknown }).data;
      if (Array.isArray(data)) {
        return data.map((item, index) => this.normalizeItem(item, index));
      }
    }
    throw new Error('La respuesta del servidor no tiene el formato esperado.');
  }

  private normalizeItem(item: unknown, index: number): CotizacionVm {
    if (item && typeof item === 'object') {
      const o = item as Record<string, unknown>;
      const id = String(o['id'] ?? o['_id'] ?? index);
      const titulo = String(o['titulo'] ?? o['title'] ?? o['nombre'] ?? 'Sin título');
      const estado = o['estado'] != null ? String(o['estado']) : undefined;
      return { id, titulo, estado };
    }
    return { id: String(index), titulo: 'Elemento sin detalle' };
  }
}
