import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup | any;
  loginForm: FormGroup | any;
  activeForm: 'login' | 'register' = 'login';

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  onSubmit() {
    if (this.activeForm === 'register') {
      if (this.registerForm.valid) {
        if (this.registerForm.value.password !== this.registerForm.value.repeatPassword) {
          alert('Passwords do not match.');
          return;
        }

        // Save user data to local storage
        let data={
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          email: this.registerForm.value.email,
          mobile: this.registerForm.value.mobile,
          gender: this.registerForm.value.gender,
          password: this.registerForm.value.password
        }
        this.saveToLocalStorage(data);

        alert('Registration successful. Please login.');

        this.registerForm.reset();
        this.activeForm = 'login';
      } else {
        alert('Please fill out all required fields correctly.');
      }
    } else if (this.activeForm === 'login') {
      if (this.loginForm.valid) {
        const storedUserData = this.getFromLocalStorage();

        if (
          storedUserData &&
          storedUserData.email === this.loginForm.value.email &&
          storedUserData.password === this.loginForm.value.password
        ) {
          alert('Login successful!');
          this.router.navigate(['/dashboard/all-transactions']);
        } else {
          alert('Invalid email or password.');
        }
      } else {
        alert('Please enter a valid email and password.');
      }
    }
  }

  // Custom validator for checking if email ends with @gmail.com
  gmailValidator(control: AbstractControl): { [key: string]: any } | null {
    const email: string = control.value;
    if (email && !email.toLowerCase().endsWith('@gmail.com')) {
      return { 'invalidEmail': true };
    }
    return null;
  }

  // Function to save user data to local storage
  saveToLocalStorage(data: any) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  // Function to retrieve user data from local storage
  getFromLocalStorage() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}

