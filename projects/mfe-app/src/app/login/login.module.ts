import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BooksComponent } from '../books/books.component';
import { CreateComponent } from '../books/create/create.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'books',
        component: BooksComponent
      },
      {
        path: 'books/create',
        component: CreateComponent
      },
    ])

  ],
  providers:[AuthService]
})
export class LoginModule { }
