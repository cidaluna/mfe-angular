import { Routes } from '@angular/router';
import { authGuard } from './login/auth.guard';

export const routes: Routes = [
  {
    path: 'books',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./books/books.component').then(m => m.BooksComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'publishers',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./publishers/publishers.component').then(m => m.PublishersComponent),
  }
];
