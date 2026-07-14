import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'

})




export class Login {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {console.log("Login component loaded");}

  loginForm = new FormGroup({

    phNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])

  });

  login(): void {
console.log("Login method called");
    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();
      return;

    }

    const phone = this.loginForm.value.phNumber;
    const password = this.loginForm.value.password;
console.log("Phone Number:", phone, "Password:", password);
    this.http.post<any>(
      `http://localhost:8080/auth/signin?phNumber=${phone}&password=${password}`,{}
    ).subscribe({

      next: (response) => {

  console.log("Login Success:", response);

  localStorage.setItem("token", response.token);

  this.router.navigate(['/dashboard']);
},

      error: (error) => {

        console.error("Login Failed:", error);

        alert("Invalid Phone Number or Password");

      }

    });

  }

}
