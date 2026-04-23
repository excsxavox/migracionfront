import { Routes } from '@angular/router';

export const cotizacionesRoutes: Routes = [
  {
    path: '',
    title: 'Listado de cotizaciones',
    loadComponent: () =>
      import('./pages/cotizaciones-list/cotizaciones-list.component').then(
        (m) => m.CotizacionesListComponent
      )
  },
  {
    path: 'acerca',
    title: 'Acerca del módulo',
    loadComponent: () =>
      import('./pages/cotizaciones-readme/cotizaciones-readme.component').then(
        (m) => m.CotizacionesReadmeComponent
      )
  }
];
