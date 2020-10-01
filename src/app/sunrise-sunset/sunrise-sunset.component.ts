import { Component, OnInit } from '@angular/core';
import { SunriseSunsetService } from '../services/sunrise-sunset.service';
import { SunriseSunset } from '../models/sunrise-sunset';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import * as SunCalc from 'node_modules/suncalc/suncalc.js';
import { AccountService } from '../services/account.service';
import { Principal } from '../models/principal';
import { BehaviorSubject } from 'rxjs';
import { Location } from '../models/location';
import { ZipToLL } from '../models/zip-to-l-l';
@Component({
  selector: 'app-sunrise-sunset',
  templateUrl: './sunrise-sunset.component.html',
  styleUrls: ['./sunrise-sunset.component.css']
})
export class SunriseSunsetComponent implements OnInit {
  locations: Location[] = [{city: 'sumter',country: 'us',location_id: 1, location_zip_code: '29150', state: 'SC'}];
  currentLocation = '';
  updating = false;
  updateForm = new FormGroup({
    location: new FormControl('', Validators.required)
  });
  suncalc = SunCalc;
  riseSetForecast: SunriseSunset[] = [];
  gotRiseSet = false;
  currentUserSubject: BehaviorSubject<Principal>;
  constructor(private riseSetService: SunriseSunsetService, private formBuilder: FormBuilder, private accountService: AccountService) {
    this.currentUserSubject = this.accountService.getCurrentUserSubject();
    console.log(this.currentUserSubject);
   }

  ngOnInit() {

    this.getRiseSet(this.currentUserSubject.value.home.locationZipCode);
    this.currentLocation = this.currentUserSubject.value.home.city;
  }
  async updateLocation(){
    this.currentLocation = this.updateFields.location.value;
    this.getRiseSet(this.updateFields.location.value);
  }
  get updateFields() {
    return this.updateForm.controls;
  }
  async getRiseSet(zip: string){
    this.gotRiseSet = false;
    // this.riseSet = new SunriseSunset;
    let latLon = (await this.riseSetService.getLatLonFromZip(zip)).records[0].fields;
    let lat = latLon.latitude;
    let lon = latLon.longitude;
    for (let i = 0; i < 30; i++){
      let currentDay = new Date();
      currentDay.setTime( currentDay.getTime() + (24 * i) * 60 * 60 * 1000);
      this.riseSetForecast[i] = <SunriseSunset> await (this.riseSetService.getSunTimesForDay(lat, lon, currentDay));
    }
    this.gotRiseSet = true;
  }



}
