import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'host-app';
  constructor(private _router: Router) {}

  goToHome(): void {
    this._router.navigate(['home']);
  }

  goToLogin(): void {
    this._router.navigate(['login']);
  }
}
