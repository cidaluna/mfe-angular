import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  /*
  {
    path: '', redirectTo:'/books', pathMatch:'full'
  },*/
  {
    path: 'books', component: BooksComponent, canActivate: [AuthGuard]
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
