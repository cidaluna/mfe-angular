import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@host-app/app/services/auth.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    // serviço do Angular que constroi o formulário
    private readonly _fb: FormBuilder,
    private readonly _auth: AuthService,
    private readonly _snackBar: CoreService,
    private readonly _router: Router
  ) { }


  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
    });
  }

  login() {
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    if (email === 'cida@app.com' && senha === '1234') {
      const fakeToken = 'jwt-token-fake';
      this._auth.login(fakeToken);
      this._snackBar.openSnackBar('Login realizado com sucesso!', 'OK');
      this._router.navigate(['/books']);
    } else {
      this._snackBar.openSnackBar('Credenciais inválidas. Tente novamente!', 'Fechar');
      this.resetForm();
    }
  }

  resetForm(): void {
    this.loginForm.reset();
  }
}
