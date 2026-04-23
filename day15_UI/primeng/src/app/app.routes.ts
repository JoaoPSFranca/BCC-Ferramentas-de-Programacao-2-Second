import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu').then((m) => m.Menu),
  }
];
