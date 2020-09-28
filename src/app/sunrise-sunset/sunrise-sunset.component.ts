import { Component, OnInit } from '@angular/core';
import { SunriseSunsetService } from '../services/sunrise-sunset.service';
import { SunriseSunset } from '../models/sunrise-sunset';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';

import { Chart, TimeScale } from 'chart.js';
import {Label } from 'ng2-charts';


@Component({
  selector: 'app-sunrise-sunset',
  templateUrl: './sunrise-sunset.component.html',
  styleUrls: ['./sunrise-sunset.component.css']
})
export class SunriseSunsetComponent implements OnInit {

  riseSet: SunriseSunset;
  riseSetForecast: SunriseSunset[];
  latitude: number;
  logitude: number;
  today = new Date();
  altDate = new Date();
  gotRiseSet = false;
  riseSetChart: Chart;
  updateForm: FormGroup;
  badDateEntered = false;
  constructor(private riseSetService: SunriseSunsetService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getRiseSetToday(33.9, -80.3);
    let date = Date.now;
    this.updateForm = this.formBuilder.group({
      newDate: ['', Validators.required]
    });
  }

  async getRiseSetToday(lat: number, lon: number){
    this.gotRiseSet = false;
    this.riseSet = <SunriseSunset> await (this.riseSetService.getSunriseSunset(lat, lon));

    this.gotRiseSet = true;
  }

  async getRiseSetForDate(lat: number, lon: number, date: string){
    console.log(date);
    this.gotRiseSet = false;
    this.riseSet = new SunriseSunset;
    this.riseSet = <SunriseSunset> await (this.riseSetService.getSunriseSunsetByDate(lat, lon, date));
    this.gotRiseSet = true;
  }

  get updateFields(){
    return this.updateForm.controls;
  }

  async updateDay(){
    let date = <Date> this.updateFields.newDate.value;
    if (date != null ||  !date){
      this.getRiseSetForDate(33.9, -80.3, this.updateFields.newDate.value);
      this.badDateEntered = false;
    } else {
      this.badDateEntered = true;
    }

  }

}
