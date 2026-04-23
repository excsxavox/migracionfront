import { Routes } from '@angular/router';

export const cotizacionesRoutes: Routes = [
  {
    path: '',
    title: 'Listado de cotizaciones',
    loadComponent: () =>
      import('./pages/cotizaciones-list/cotizaciones-list.component').then(
        (m) => m.CotizacionesListComponent
      )
  }
];
