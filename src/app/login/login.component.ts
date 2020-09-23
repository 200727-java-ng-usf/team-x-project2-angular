import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Declare Login Form
  loginForm: FormGroup;
  // Boolean Loading Value
  loading = false;
  // Boolean Submitted Value
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    console.log('LoginComponent instantiating...');
    console.log('LoginComponent instantiation complete.');
   }

  ngOnInit(): void {
    console.log('Initializing form values for LoginComponent...');

    // Validate  loginForm
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    console.log('LoginComponent form value initialization complete.');
  }

  get formFields() {
    return this.loginForm.controls;
  }

  login() {

    this.submitted = true;

    if (this.loginForm.invalid){
      return;
    }

    this.loading = true;

    // TODO: Authenticate using auth service
  }
}
