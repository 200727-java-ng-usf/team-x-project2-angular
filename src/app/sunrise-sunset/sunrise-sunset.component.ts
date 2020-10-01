import { Component, OnInit } from '@angular/core';
import { SunriseSunsetService } from '../services/sunrise-sunset.service';
import { SunriseSunset } from '../models/sunrise-sunset';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import * as SunCalc from 'node_modules/suncalc/suncalc.js';
import { AccountService } from '../services/account.service';
import { Principal } from '../models/principal';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-sunrise-sunset',
  templateUrl: './sunrise-sunset.component.html',
  styleUrls: ['./sunrise-sunset.component.css']
})
export class SunriseSunsetComponent implements OnInit {
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

  }

  async getRiseSet(zip: string){
    this.gotRiseSet = false;
    // this.riseSet = new SunriseSunset;
    for (let i = 0; i < 30; i++){
      let currentDay = new Date();
      currentDay.setTime( currentDay.getTime() + (24 * i) * 60 * 60 * 1000);
      this.riseSetForecast[i] = <SunriseSunset> await (this.riseSetService.getSunTimesForDay(zip, currentDay));
    }
    this.gotRiseSet = true;
  }



}
