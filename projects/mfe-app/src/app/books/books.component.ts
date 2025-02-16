import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from '../core/core.service';
import { BookAddEditComponent } from './book-add-edit/book-add-edit.component';
import { BooksService } from './books.service';
import { Books } from './books';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'title', 'category', 'publisher', 'action'];  // Colunas da tabela
  dataSource = new MatTableDataSource<Books>();  // MatTableDataSource tipado com Books
  filteredData: Books[] = [];  // Dados filtrados
  allBooks: Books[] = [];  // Todos os livros carregados da API
  pageSize!: number;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   *  Componente de listagem de livros
   *  Utiliza os recursos de Dialog e SnackBar do Angular Material
   *  Utiliza os serviços necessários para interagir com a API e gerenciar a interface
   */
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _bookService: BooksService,
    private readonly _coreService: CoreService,
    private readonly _router: Router
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = this.pageSize; // Define o pageSize inicial
  }

  ngOnInit(): void {
    this.startListBooks();
  }

  /**
   * Obtém a lista de livros e atualiza o Mat Table do Material
   * Com os dados do arquivo db.json, a ordenação e a paginação
   */
  startListBooks() {
    this._bookService.getAll().subscribe({
      next: (res: Books[]) => {  // Garantir que a resposta é um array de Books
        this.allBooks = res;  // Armazenar todos os livros
        this.filteredData = res;  // Inicializar os dados filtrados com todos os livros
        this.dataSource = new MatTableDataSource<Books>(this.filteredData);  // Configurar o dataSource
        this.updateDataSource();
        console.log("Start List:", this.dataSource.data);
      },
      error: (err) =>{
        console.log(err);
      },
      complete: () => {
      }
    });
  }

  /**
   * Abre o Dialog Form Livros
   * Se houve inserção de dados após fechar o Dialog
   * Chama a listagem de livros
   */
  openAddEditBookForm() {
    const dialogRef = this._dialog.open(BookAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.startListBooks();
        }
      },
    });
  }


  /**
   *  Recupera o que o usuário digitou no filtro e
   *  Utiliza a propriedade filter para ver se existe o dado na tabela
   *  Se existir carrega na primeira página
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Filtra os livros armazenados (todos) conforme o termo de pesquisa
    this.filteredData = this.allBooks.filter(item =>
      item.title.toLowerCase().includes(filterValue) ||
      item.category.toLowerCase().includes(filterValue) ||
      item.publisher.toLowerCase().includes(filterValue)
    );

    this.updateDataSource();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /**
   * Faz a exclusão de um livro, dispara o snackBar
   * de acordo com o id informado
   * e chama a listagem de livros
  */
  deleteBookById(id: number) {
    this._bookService.deleteBook(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Livro excluído!', 'fechar');
        this.startListBooks();
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }


  /**
   * Abre o Dialog Form Livros com os dados carregados (data)
   * Se houve edição de dados após fechar o Dialog
   * Chama a listagem de livros
   */
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(BookAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.startListBooks();
        }
      },
    });
  }

  openPublishers(){
    this._router.navigate(['/publishers']);
  }

  updateDataSource(){
    const pageSize = this.paginator.pageSize;
    const pageIndex = this.paginator.pageIndex;
    const paginatedBooks = this.filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    console.log('Page Size:',pageSize);
    console.log('Page Index:',pageIndex);
    console.log('paginatedBooks:',paginatedBooks);
    this.dataSource = new MatTableDataSource(paginatedBooks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Método que é chamado sempre que o usuário muda a página ou o número de itens por página
  onPageChange(event: any) {
    console.log("Chamou onPageChange");
    this.startListBooks(); // Atualiza os dados conforme o novo tamanho da página
  }

  exportInCSV(){
    console.log("Chamou export");
  }

}
