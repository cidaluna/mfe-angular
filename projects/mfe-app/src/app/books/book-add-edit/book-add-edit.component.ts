import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { Books } from '../books';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-add-edit',
  templateUrl: './book-add-edit.component.html',
  styleUrls: ['./book-add-edit.component.scss']
})
export class BookAddEditComponent implements OnInit{

  bookForm!: FormGroup;
  isSubmitting: boolean = false; // Variável para controlar o estado do botão

  category: string[] = [
    'AutoAjuda',
    'Infantil',
    'Didático',
    'Poesia',
  ];

  constructor(
    private _fb: FormBuilder,
    private _bookService: BooksService,
    private _dialogRef: MatDialogRef<BookAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.bookForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', Validators.required],
      publisher: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    // Inicia preenchendo os campos do Form Livro (se houver) com os dados passados pela prop data
    this.bookForm.patchValue(this.data);
  }


  /**
   * Se existir dado carregado no Form utiliza o atualizar livro
   * Se não existir utiliza o service adicionar livro exibindo as msgs com snackBar
   */
  onFormSubmit() {
    if (this.bookForm.valid) {
      this.isSubmitting = true;
      if (this.data) {
        this._bookService
          .updateBook(this.data.id, this.bookForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Livro atualizado com sucesso!');
              this._dialogRef.close(true);
              this.isSubmitting = false;
            },
            error: (err: any) => {
              console.error(err);
              this.isSubmitting = false;
            },
          });
      } else {
        // Criação de um novo livro
        this._bookService.getAll().subscribe((books: Books[]) => {
          //const newId = this.generateId(books);
          // Adiciona o novo ID aos dados do livro
          // const newBookData = { id: newId, ...this.bookForm.value };
          this._bookService.createBook(this.bookForm.value).subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Livro adicionado com sucesso');
              this._dialogRef.close(true);
              this.isSubmitting = false;
            },
            error: (err: any) => {
              console.error(err);
              this.isSubmitting = false;
            },
          });
        });
      }
    }
  }

  private generateId(books: Books[]): number {
    // Mapeia os IDs e filtra apenas números válidos
    const ids = books
      .map(book => book.id)
      .filter((id): id is number => typeof id === 'number' && !isNaN(id)); // Filtra para garantir que seja um número

    // Encontra o maior ID e começa a partir dele
    let newId = (ids.length > 0 ? Math.max(...ids) : 0) + 1;

    // Garante que o novo ID não seja duplicado
    while (ids.includes(newId)) {
      newId++;
    }

    return newId;
  }
}
