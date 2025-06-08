import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CoreService } from '@mfe-app/app/core/core.service';
import { BookAddEditComponent } from '@mfe-app/app/books/book-add-edit/book-add-edit.component';
import { BooksService } from '@mfe-app/app/books/books.service';
import { Books } from '@mfe-app/app/books/books.interface';
import { saveAs } from 'file-saver';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [BooksService, CoreService],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'title', 'category', 'publisher', 'startDate', 'action'];  // Colunas da tabela

  dataSource = new MatTableDataSource<Books>();  // MatTableDataSource tipado com Books
  filteredData: Books[] = [];  // Dados filtrados
  allBooks: Books[] = [];  // Todos os livros carregados da API
  pageSize!: number;
  totalRecords = 0;
  rows = 9;
  first = 0;

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

    this.totalRecords = this.filteredData.length;
    this.dataSource.data = this.filteredData.slice(this.first, this.first + this.rows);
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
    this._router.navigate(['publishers']);
  }

  updateDataSource(){
    const pageSize = this.paginator.pageSize;
    const pageIndex = this.paginator.pageIndex;
    const paginatedBooks = this.filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    console.log('Items per page:',pageSize);
    console.log('Page Index:',pageIndex);
    console.log('paginatedBooks:',paginatedBooks);
    this.dataSource = new MatTableDataSource(paginatedBooks);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = this.pageSize;
  }

  // Método que é chamado sempre que o usuário muda a página ou o número de itens por página
  onPageChange(event: any) {
    console.log("Chamou onPageChange");
    this.startListBooks(); // Atualiza os dados conforme o novo tamanho da página
  }

  exportToCSV() {
      // Acessa os dados da MatTableDataSource
  const data = this.dataSource.data; // A instância de MatTableDataSource, onde estão os dados

  // Filtra a coluna de "ações" se estiver em displayedColumns
  const columnsWithoutActions = this.displayedColumns.filter(col => col !== 'action'); // 'ações' é o nome da coluna de ações

  // Converte os dados para CSV
  const header = columnsWithoutActions.join(';');  // Cabeçalho separado por ponto e vírgula

  // Mapeia os dados para gerar as linhas do CSV, excluindo a coluna de ações
  const rows = data.map(item =>
    columnsWithoutActions.map(col => item[col as keyof Books]).join(';')  // Junta os valores das colunas com ponto e vírgula
  ).join('\n');  // Junta todas as linhas com quebras de linha

  // Concatena o cabeçalho e as linhas para formar o conteúdo completo do CSV
  const csvContent = header + '\n' + rows;

  // Adiciona o BOM para garantir a codificação correta no arquivo
  const bom = '\uFEFF';

  // Cria um Blob com o conteúdo CSV, incluindo o BOM, e especifica o tipo de arquivo como UTF-8
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });

  // Inicia o download do arquivo CSV com o nome 'tabela-dados.csv'
  saveAs(blob, 'tabela-dados.csv');
  }

}
