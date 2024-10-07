import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly users = [
    { email: 'cida@app.com', senha: '1234' } // Usuário fictício para teste
  ];

  constructor(private httpService: HttpClient) { }

  authLogin(email: string, senha: string):Observable<any>{
    //return this.httpService.post<Login>(API, {email, senha});
    const user = this.users.find(u => u.email === email && u.senha === senha);
    if (user) {
      localStorage.setItem('accessToken', 'fake-jwt-token');
      return of(true);
    } else {
      return throwError(() => new Error('Credenciais inválidas'));
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

}
