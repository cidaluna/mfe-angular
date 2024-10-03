import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Books } from './books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly API = 'http://localhost:3000/apibooks'
  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<Books[]>(this.API);
  }
}
