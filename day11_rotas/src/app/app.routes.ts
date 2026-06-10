import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'page1',
        loadComponent: () => import('./pages/page1/page1').then(m => m.Page1)
    },
    {
        path: 'page2/:id',
        loadComponent: () => import('./pages/page2/page2').then(m => m.Page2)
    }
];
