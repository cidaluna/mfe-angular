import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{

  createBookForm!: FormGroup;

  constructor(private booksService: BooksService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
      this.createBookForm = this.formBuilder.group({
        id: [],
        title: ['',Validators.required],
        category: ['',Validators.required],
        publisher: ['',Validators.required]
      })
  };


  save(){
    if(this.createBookForm){
      this.booksService.createBook(this.createBookForm.value)
      .subscribe(() => {
        this.router.navigate(['books/create'])
      }
    )}
  };

  cancel(){
    this.router.navigate(['/home'])
  }


}
