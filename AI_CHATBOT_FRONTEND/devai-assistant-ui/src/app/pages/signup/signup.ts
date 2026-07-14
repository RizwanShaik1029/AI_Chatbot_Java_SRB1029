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
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signupForm = new FormGroup({

    username: new FormControl('', Validators.required),

    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(18)
    ]),

    role: new FormControl('USER'),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    phNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ])

  });

  register(): void {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    console.log(this.signupForm.value);

    this.http.post<any>(
      'http://localhost:8080/auth/signup',
      this.signupForm.value
    ).subscribe({

      next: (response) => {

        console.log("Signup Success:", response);

        alert("Registration Successful");

        // Navigate to Login page
        this.router.navigate(['/login']);
      },

      error: (error) => {

        console.error("Signup Failed:", error);

        alert("Registration Failed");

      }

    });

  }

}
