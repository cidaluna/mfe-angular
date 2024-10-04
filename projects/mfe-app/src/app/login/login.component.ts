import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    // serviço do Angular que constroi o formulário
    private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null],
      senha: [null],
    });
  }

  login() {
    console.log("Login teste", this.loginForm.value)
  }

}
