import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksService } from './books.service';



@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: BooksComponent
      }
    ])

  ],
  providers:[BooksService]
})
export class BooksModule { }
