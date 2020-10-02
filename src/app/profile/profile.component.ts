import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Principal } from '../models/principal';
import { AccountService } from '../services/account.service';
import { LocationsService } from '../services/locations.service';
import { Location } from '../models/location';

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

  addLocationForm: FormGroup;
  constructor(private accountService: AccountService, private locationService: LocationsService) {
    this.updatePasswordForm = new FormGroup({
      password: new FormControl('', Validators.required)
    });
    this.addLocationForm = new FormGroup({
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      locationZipCode: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  get formFields() {
    return this.updatePasswordForm.controls;
  }

  get addLocationFields() {
    return this.addLocationForm.controls;
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

  addLocation() {

    // this.submitted = true;

    // if(this.updatePasswordForm.invalid) return;
    let addLocation = {
      // locationId: 0,
      city: this.addLocationFields.city.value,
      state: this.addLocationFields.state.value,
      country: this.addLocationFields.country.value,
      locationZipCode: this.addLocationFields.locationZipCode.value
    };
    this.loading = true;
    this.locationService.addLocation(addLocation as Location);

    // this.accountService.updatePassword(this.formFields.password.value)
    //                     .subscribe(
    //                       () => {
    //                         this.errorDuringUpdate = null;
    //                         console.log('Update Successful');
    //                       },
    //                       err => {
    //                         this.errorDuringUpdate = err;
    //                       },
    //                       () => {
    //                         this.loading = false;
    //                         this.submitted = false;
    //                       }
    //                     )

  }

}
