import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';



@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    RouterModule.forChild([
      {
        path: '',
        component: BooksComponent
      }
    ])

  ],
})
export class BooksModule { }
