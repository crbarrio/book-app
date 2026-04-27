import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home'),
    },
    {
        path: 'books',
        loadComponent: () => import('./book-list/book-list'),
    },
    {
        path: 'books/:id',
        loadComponent: () => import('./book-details/book-details'),
    },
    {
        path: '**',
        loadComponent: () => import('./not-found/not-found'),
    },
];
