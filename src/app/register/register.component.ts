import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) {

    console.log('RegisterComponent instantiating...');
    console.log('RegisterComponent instantiation complete.');

  }

  ngOnInit(): void {
    
    console.log('Initializing form values for RegisterComponent...');

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      email: ['', Validators.required],
      zipcode: ['']
    });

    console.log('RegisterComponent form value initialization complete.');

  }

  get formFields() {
    return this.registerForm.controls;
  }

  register() {
    
    this.submitted = true;

    if (this.registerForm.invalid) return;

    this.loading = true;

    //TODO once all columns are known
    this.registerService.register(this.formFields.username.value, this.formFields.password.value, this.formFields.firstName.value, 
      this.formFields.lastName.value, this.formFields.email.value)
                        .subscribe(
                          // user successfully registered
                          () => {
                            this.loading = false;
                            console.log('Register Successful!');
                            console.log('Navigating to dashboard...');
                            this.router.navigate(['/']);
                          },
                          // an error occurs
                          err => {
                            console.log(err);
                            this.loading = false;
                            this.submitted = false;
                          },
                          () => {
                            console.log('observable complete!')
                          }

                        )

  }



}
