import { Component, OnInit } from '@angular/core';
import { SunriseSunsetService } from '../services/sunrise-sunset.service';
import { SunriseSunset } from '../models/sunrise-sunset';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import * as SunCalc from 'node_modules/suncalc/suncalc.js';

@Component({
  selector: 'app-sunrise-sunset',
  templateUrl: './sunrise-sunset.component.html',
  styleUrls: ['./sunrise-sunset.component.css']
})
export class SunriseSunsetComponent implements OnInit {
  suncalc = SunCalc;
  riseSetForecast: SunriseSunset[] = [];
  gotRiseSet = false;
  constructor(private riseSetService: SunriseSunsetService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getRiseSet('29150');

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
