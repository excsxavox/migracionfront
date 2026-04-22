import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { CotizacionVm } from '../models/cotizacion.vm';

export interface CotizacionesPort {
  listar(): Observable<CotizacionVm[]>;
}

export const COTIZACIONES_PORT = new InjectionToken<CotizacionesPort>('COTIZACIONES_PORT');
