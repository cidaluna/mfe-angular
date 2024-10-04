import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap'; // Importando a classe Modal do Bootstrap
import { switchMap } from 'rxjs/operators';
import { Books } from '../books';
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
      this.onSubmit();
  };

  private generateId(books: Books[]): number {
    // Mapeia os IDs e filtra apenas números válidos
    const ids = books
      .map(book => book.id)
      .filter((id): id is number => typeof id === 'number' && !isNaN(id)); // Filtra para garantir que seja um número
    // Se o array estiver vazio, retorna 1, caso contrário, retorna o maior ID + 1
    return (ids.length > 0 ? Math.max(...ids) : 0) + 1;
  }

  onSubmit(): void{
    // Inicializa o formulário
    this.createBookForm = this.fb.group({
      id:  [null],
      title: ['',Validators.required],
      category: ['',Validators.required],
      publisher: ['',Validators.required]
    })
  }

  save(): void {
    if (this.createBookForm.valid) {
      // Obtem a lista de livros e gera o ID
      this.booksService.getAll().pipe(
        switchMap((books: Books[]) => {
          const newId = this.generateId(books);
          this.createBookForm.patchValue({ id: newId }); // Atualiza o ID no formulário
          return this.booksService.createBook(this.createBookForm.value); // Chama o método de salvar
        })
      ).subscribe(() => {
        this.router.navigate(['books']); // Navega para a lista de livros
        console.log('Livro criado:', this.createBookForm.value);
        this.closeModal(); // Fechar o modal aqui
      }, error => {
        console.error('Erro ao criar livro:', error); // Lida com erros
      });
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('exampleModal');

    if (modalElement) { // Verifica se modalElement não é null
      const modal = Modal.getInstance(modalElement); // Obtém a instância do modal
      if (modal) {
        modal.hide(); // Fecha o modal
      }
    }
  }

  cancel(){
    this.router.navigate(['/home'])
  }


}
