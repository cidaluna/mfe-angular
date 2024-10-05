import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from './books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private API = 'http://localhost:4000/apibooks';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Books[]>{
    // Para recuperar todos os livros utilizamos o método GET
    return this.httpClient.get<Books[]>(this.API);
  }

  createBook(data: Books): Observable<Books>{
    // Para cadastrar utilizamos o método POST,
    // precisamos da URL da API Backend e dos dados do livro
    return this.httpClient.post<Books>(this.API, data);
  }

  updateBook(id:number, data: Books):Observable<Books>{
    // Para editar utilizamos o método PUT,
    // precisamos da URL da API e do id do livro que deseja alterar
    return this.httpClient.put<Books>(`${this.API}/${id}`, data);
  }

  deleteBook(id: number):Observable<Books>{
    // Para excluir utilizamos o método DELETE e o id que deseja exluir
    return this.httpClient.delete<Books>(`${this.API}/${id}`);
  }

}
