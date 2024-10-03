import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BooksComponent } from './books.component';



@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [BooksComponent]
})
export class BooksModule { }
