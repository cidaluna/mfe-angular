import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from './books';

const API = 'http://localhost:4000/apibooks';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Books[]>{
    // Para recuperar todos os livros utilizamos o método GET
    return this.httpClient.get<Books[]>(API);
  }

  getId(id: number):Observable<Books>{
    // Para recuperar um livro específico
    const url = `${API}/${id}`
    return this.httpClient.get<Books>(url);
  }

  createBook(data: Books): Observable<Books>{
    // Para cadastrar utilizamos o método POST,
    // precisamos da URL da API Backend e dos dados do livro
    return this.httpClient.post<Books>(API, data);
  }

  updateBook(data: Books):Observable<Books>{
    // Para editar utilizamos o método PUT,
    // precisamos da URL da API e do id do livro que deseja alterar
    const url = `${API}/${data.id}`
    return this.httpClient.put<Books>(url, data);
  }

  deleteBook(id: number):Observable<Books>{
    // Para excluir utilizamos o método DELETE e o id que deseja exluir
    const url = `${API}/${id}`
    return this.httpClient.delete<Books>(url);
  }

}
