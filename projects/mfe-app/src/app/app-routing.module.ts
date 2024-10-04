import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { CreateComponent } from './books/create/create.component';
import { EditComponent } from './books/edit/edit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', redirectTo:'/books', pathMatch:'full'
  },
  {
    path: 'books', component: BooksComponent
  },
  {
    path: 'books/create', component: CreateComponent
  },
  {
    path: 'books/:id', component: EditComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  /*
  {
    path: '**', redirectTo: '/books', pathMatch: 'full'
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // exports: [RouterModule]
})
export class AppRoutingModule { }
