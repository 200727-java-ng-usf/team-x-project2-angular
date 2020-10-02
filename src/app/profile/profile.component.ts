import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Principal } from '../models/principal';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loading = false;
  submitted = false;
  updatePasswordForm: FormGroup;
  errorDuringUpdate;

  constructor(private accountService: AccountService) {
    this.updatePasswordForm = new FormGroup({
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  get formFields() {
    return this.updatePasswordForm.controls;
  }

  updatePassword() {

    this.submitted = true;

    if(this.updatePasswordForm.invalid) return;

    this.loading = true;

    this.accountService.updatePassword(this.formFields.password.value)
                        .subscribe(
                          () => {
                            this.errorDuringUpdate = null;
                            console.log('Update Successful');
                          },
                          err => {
                            this.errorDuringUpdate = err;
                          },
                          () => {
                            this.loading = false;
                            this.submitted = false;
                          }
                        )

  }

}
