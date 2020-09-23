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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Validate loginForm
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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

    // Authenticate
    this.authService.authenticate(this.formFields.username.value, this.formFields.password.value)
                    .subscribe(
                      () => {
                        this.loading = false;
                        console.log('login successful!');
                        console.log('Navigating to dashboard...');
                        this.router.navigate(['/dashboard']);
                      },
                      err => {
                        console.log(err);
                        this.loading = false;
                        this.submitted = false;
                      },
                      () => {
                        console.log('observable complete');
                      }
                    );
  }
}
