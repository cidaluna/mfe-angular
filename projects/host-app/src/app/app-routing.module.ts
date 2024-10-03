import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';

const MFE_URL = "http://localhost:4333/remoteEntry.js";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
/*
  {
    path: 'books',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: MFE_URL, // A URL deve estar correta e acessível
        //remoteName: 'mfeApp', // Deve corresponder ao 'name' no webpack do micro frontend
        exposedModule: './BooksModule' // Certifique-se de que corresponde ao caminho do webpack
      })
      .then(m => {
        if (!m || !m.BooksModule) {
          throw new Error('BooksModule não foi encontrado no micro frontend');
        }
        return m.BooksModule;
      })
      .catch(err => {
        console.error('Erro ao carregar o módulo BooksModule:', err);
        throw err;
      });
    }
  },  */
  {
    path: 'books',
    loadChildren: () => import('./../../../mfe-app/src/app/books/books.module').then(m => m.BooksModule)
  },
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routeCompArr = [HomeComponent, TodoComponent];
