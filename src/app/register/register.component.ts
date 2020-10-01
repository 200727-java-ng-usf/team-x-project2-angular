import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errorDuringRegistration;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) {

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
    this.accountService.register(this.formFields.username.value, this.formFields.password.value, this.formFields.firstName.value, 
      this.formFields.lastName.value, this.formFields.email.value)
                        .subscribe(
                          // user successfully registered
                          () => {
                            this.errorDuringRegistration = null;
                            this.loading = false;
                            console.log('Register Successful!');
                            console.log('Navigating to dashboard...');
                            this.router.navigate(['/home']);
                          },
                          // an error occurs
                          err => {
                            this.errorDuringRegistration = err;
                            console.log("erRor: ");
                            console.log(err);
                            console.log("Status code");
                            console.log(err.status);
                            this.loading = false;
                            this.submitted = false;
                          },
                          () => {
                            console.log('observable complete!');
                          }

                        )

  }



}
