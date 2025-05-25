import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const MFE_URL = "http://localhost:4333/remoteEntry.js";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'books',
    loadComponent: () =>
      import('./../../../mfe-app/src/app/books/books.component').then(m => m.BooksComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./../../../mfe-app/src/app/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'publishers',
    loadComponent: () =>
      import('./../../../mfe-app/src/app/publishers/publishers.component').then(m => m.PublishersComponent)
  }
];
