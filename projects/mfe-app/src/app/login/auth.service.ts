import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login';

const API = 'http://localhost:4000/apilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpClient) { }

  authLogin(email: string, senha: string):Observable<Login>{
    return this.httpService.post<Login>(API, {email, senha});
  }


}
