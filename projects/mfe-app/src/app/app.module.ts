import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksModule } from './books/books.module';
import { BooksService } from './books/books.service';
import { CoreService } from './core/core.service';
import { AuthService } from './login/auth.service';
import { LoginModule } from './login/login.module';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PublishersModule } from './publishers/publishers.module';
import { PublishersService } from './publishers/publishers.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,  // ok
    AppRoutingModule,
    BooksModule,
    LoginModule,
    PublishersModule, // ok
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatSortModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [AuthService, BooksService, CoreService, PublishersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
