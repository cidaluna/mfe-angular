import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksModule } from './books/books.module';
import { BooksService } from './books/books.service';
import { AuthService } from './login/auth.service';
import { LoginModule } from './login/login.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,  // ok
    AppRoutingModule,
    BooksModule,
    LoginModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
