import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/vendas',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then((m) => m.Login),
  },
  {
    path: 'vendas',
    loadComponent: () =>
      import('./pages/vendas-list/vendas-list').then((m) => m.VendasList),
    canActivate: [AuthGuard]
  }
];

