import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'host-app';
  constructor(
    public readonly _auth: AuthService,
    public readonly _router: Router
  ) {}


  get isLoggedIn() {
    return this._auth.isAuthenticated();
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['/login']);
  }
}
