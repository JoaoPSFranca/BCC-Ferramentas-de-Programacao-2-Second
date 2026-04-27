import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'vendas',
    loadComponent: () => import('./pages/vendas/vendas').then((m) => m.Vendas),
  },
];
