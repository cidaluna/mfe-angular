import { Component, OnInit } from '@angular/core';
import { Books } from './books';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{

  listAllBooks: Books[] = [];

  // Após a criação do Books Service, posso consumir os métodos criados lá.
  constructor(private service: BooksService) { }

  ngOnInit(): void {
    // começo chamando a listagem de livros
    this.startListBooks();
  }

  startListBooks(){
    // Sou um subscriber e retorno o que o Observable informar
    this.service.getAll().subscribe((resp) => {
      this.listAllBooks = resp;
    });
  }

  createBook(){

  }

}
