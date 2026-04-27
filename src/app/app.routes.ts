import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home'),
    },
    {
        path: 'books',
        loadComponent: () => import('./components/book-list/book-list'),
    },
    {
        path: 'books/:id',
        loadComponent: () => import('./components/book-details/book-details'),
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found'),
    },
];
