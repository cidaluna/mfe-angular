import { Routes } from '@angular/router';
import { HomeComponent } from '@host-app/app/home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { authGuard } from '@mfe-app/app/login/auth.guard';

export const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: { name: 'home' }
  },
  {
    path: 'login',
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4333/remoteEntry.js',
        remoteName: 'mfeApp',
        exposedModule: './LoginComponent',
      }).then(m => m.LoginComponent),
      data: { name: 'login' }
  },
  {
    path: 'books',
    canActivate: [authGuard],
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4333/remoteEntry.js',
        remoteName: 'mfeApp',
        exposedModule: './BooksComponent',
      }).then(m => m.BooksComponent),
      data: { name: 'books' }
  },
  {
    path: 'publishers',
    canActivate: [authGuard],
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4333/remoteEntry.js',
        remoteName: 'mfeApp',
        exposedModule: './PublishersComponent',
      }).then(m => m.PublishersComponent),
      data: { name: 'publishers' }
  }
];
