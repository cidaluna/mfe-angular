import { Routes } from '@angular/router';
import { AuthGuard } from './login/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path: 'books',
    canActivate: [AuthGuard],
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
    loadComponent: () =>
      import('./publishers/publishers.component').then(m => m.PublishersComponent),
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];
