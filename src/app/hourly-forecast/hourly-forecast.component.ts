import { Component, OnInit, ElementRef } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { ChartOptions, ChartDataSets, Chart } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { WeatherGov } from '../models/weather_gov';
import { StationReturn } from '../models/forecastStation';
import { AccountService } from '../services/account.service';
import { Principal } from '../models/principal';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import { Location } from '../models/location';
import { Forecast } from '../models/daily-forecast';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.css']
})
export class HourlyForecastComponent implements OnInit {
  locations: Location[] = [{city: 'sumter',country: 'us',location_id: 1, location_zip_code: '29150', state: 'SC'}];
  currentLocation;
  updating = false;
  updateForm = new FormGroup({
    location: new FormControl('', Validators.required)
  });
  forecast: WeatherGov;
  station: StationReturn;
  currentUserSubject: BehaviorSubject<Principal>;
  constructor(private forecastService: ForecastService, private elementRef: ElementRef, private accountService: AccountService, private formBuilder: FormBuilder) {
    this.forecast = new Forecast();
    this.currentUserSubject = accountService.getCurrentUserSubject();
    console.log(this.currentUserSubject);
   }
  gotForecast = false;
  async ngOnInit() {
    this.getForecast(this.currentUserSubject.value.home.locationZipCode);
    this.currentLocation = this.currentUserSubject.value.home.city;
  }

  async updateLocation(){
    this.currentLocation = this.updateFields.location.value;
    this.getForecast(this.updateFields.location.value);

  }
  async getForecast(zip: string){
    this.forecast = <WeatherGov> await (await this.forecastService.getGovHourlyForecast(zip));
    console.log(this.forecast.properties.periods);
    let tempArr = [];
    let labelArr = [];
    for(let i = 0; i < this.forecast.properties.periods.length; i++){
      tempArr[i] = this.forecast.properties.periods[i].temperature;
      let somedate = new Date(this.forecast.properties.periods[i].endTime);
      labelArr[i] = somedate;
    }
    this.gotForecast = true;
    this.generateTemperatureChart(labelArr, tempArr);
  }
  get updateFields() {
    return this.updateForm.controls;
  }
  generateTemperatureChart(labelArray: Date[], dataArray: number[]){
    let newChart = new Chart('tempChart', {
      type: 'line',
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          title: {
            display: true,
            text: 'Hourly Temperature'
          },
          scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'hour',
                }
            }]
          }
        },
        data: {
          labels: labelArray,
          datasets: [{
            label: '\xB0 F',
            data: dataArray,
            backgroundColor: 'rgba(21, 255, 255, 0.03)',
            borderColor: 'black',
            borderWidth: 1
          }]
        }
    });
  }
}
