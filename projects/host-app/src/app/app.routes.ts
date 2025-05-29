import { Routes } from '@angular/router';
import { HomeComponent } from '@host-app/app/home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4333/remoteEntry.js',
        remoteName: 'mfeApp',
        exposedModule: './LoginComponent',
      }).then(m => m.LoginComponent),
  },
  {
    path: 'books',
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4333/remoteEntry.js',
        remoteName: 'mfeApp',
        exposedModule: './BooksComponent',
      }).then(m => m.BooksComponent),
  },
  {
    path: 'publishers',
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4333/remoteEntry.js',
        remoteName: 'mfeApp',
        exposedModule: './PublishersComponent',
      }).then(m => m.PublishersComponent),
  }
];
