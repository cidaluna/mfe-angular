import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    // serviço do Angular que constroi o formulário
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('LoginComponent ngOnInit');
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
    });
  }

  login() {
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;
    this.authService.authLogin(email, senha).subscribe({
      next: (value) => {
        console.log('Login teste', value);
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.log('Login erro', err);
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        this.resetForm();
      },
    });
  }

  resetForm(): void {
    this.loginForm.reset();
  }
}
