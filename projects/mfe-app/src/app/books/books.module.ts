import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksService } from './books.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    BooksComponent,
    CreateComponent,
    EditComponent
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
        component: BooksComponent
      }
    ])

  ],
  providers:[BooksService]
})
export class BooksModule { }
