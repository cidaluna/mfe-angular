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

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private router: Router,
  ){}


  ngOnInit(): void {
      this.createBookForm = this.fb.group({
        id: [],
        title: ['',Validators.required],
        category: ['',Validators.required],
        publisher: ['',Validators.required]
      })
  };

  save(){
    if(this.createBookForm.valid){
      this.booksService.createBook(this.createBookForm.value)
      .subscribe(() => {
        this.router.navigate(['books']);
        console.log('Livro criado:', this.createBookForm.value);
      }
    )}
  };

  cancel(){
    this.router.navigate(['/home'])
  }


}
