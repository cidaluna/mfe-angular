import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly _loggedIn = signal<boolean>(!!localStorage.getItem(this.tokenKey));
  readonly isLoggedIn$ = computed(() => this._loggedIn());

  login(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this._loggedIn.set(true);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this._loggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this._loggedIn();
  }
}
