import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '/login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: '/os-list',
    loadComponent: () => import('./pages/so-list/so-list.page').then((m) => m.SoListPage),
    canActivate: [AuthGuard],
  },
  {
    path: '/os-form',
    loadComponent: () => import('./components/service-order-form/service-order-form').then((m) => m.ServiceOrderForm),
    canActivate: [AuthGuard],
  },
];
