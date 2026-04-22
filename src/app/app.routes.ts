import { Routes } from '@angular/router';

import { MainLayoutComponent } from './shell/layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    title: 'Cotizaciones',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'cotizaciones' },
      {
        path: 'cotizaciones',
        title: 'Cotizaciones',
        loadChildren: () =>
          import('./features/cotizaciones/cotizaciones.routes').then((m) => m.cotizacionesRoutes)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
