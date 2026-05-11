import { Routes } from '@angular/router';
import { Tarefas } from './pages/tarefas/tarefas';
import { AuthGuard } from './guards/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tarefas',
    pathMatch: 'full',
  },
  {
    path: 'tarefas',
    loadComponent: () => import('./pages/tarefas/tarefas').then((m) => m.Tarefas),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
];
