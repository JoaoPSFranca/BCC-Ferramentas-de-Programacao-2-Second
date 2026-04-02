import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full',
    },
    {
        path: 'posts',
        loadComponent: () => import('./components/posts/posts').then((m) => m.Posts),
    },
    {
        path: 'posts/:id/coments',
        loadComponent: () => import('./components/coments/coments').then((m) => m.Coments),
    }
];
