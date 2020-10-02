import { Component, OnInit, ElementRef } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { Location } from '../models/location';
import { ChartOptions, ChartDataSets, Chart } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { Forecast } from '../models/daily-forecast';
import { StationReturn } from '../models/forecastStation';
import { AccountService } from '../services/account.service';
import { Principal } from '../models/principal';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import { LocationsService } from '../services/locations.service';
@Component({
  selector: 'app-seven-day-forecast',
  templateUrl: './seven-day-forecast.component.html',
  styleUrls: ['./seven-day-forecast.component.css']
})
export class SevenDayForecastComponent implements OnInit {
  currentUserSubject: BehaviorSubject<Principal>;
  currentForecast: Forecast;
  gotForecast = false;
  favoriteLocations = [];
  station: StationReturn;
  currentLocation = '';
  locations: Location[] = [{city: 'sumter',country: 'us',locationId: 1, locationZipCode: '29150', state: 'SC'}];
  updating = false;
  updateForm = new FormGroup({
    location: new FormControl('', Validators.required)
  });
  constructor(private locationService: LocationsService, private forecastService: ForecastService, private elementRef: ElementRef, private accountService: AccountService, private formBuilder: FormBuilder) {
    this.currentUserSubject = this.accountService.getCurrentUserSubject();
    console.log(this.currentUserSubject);
    this.locations = <Location[]> JSON.parse(localStorage.getItem('locations'));
    // this.locationService.getCurrentLocationSubject().value;
    this.currentLocation = this.currentUserSubject.value.home.city;
  }

  async ngOnInit() {
    this.getForecast(this.currentUserSubject.value.home.locationZipCode);


  }
  get updateFields() {
    return this.updateForm.controls;
  }
  async updateLocation(){
    this.getForecast(this.updateFields.location.value);
  }
  get selectedLocation(): any{
    return this.updateForm.get('selectedLocation');
  }

  async getForecast(zip: string){
    // this.locations = <Location[]> JSON.parse(localStorage.getItem('locations'));
    // console.log();
    this.currentForecast = <Forecast> await (await this.forecastService.getDailyForecast(zip));




    let forcastTemps2 = [];
    let forecastMaxTemps2 = [];
    let forecastMinTemps2 = [];
    let tempChartLabels2 = [];
    for (let i = 0; i < this.currentForecast.properties.periods.length; i++){
      forcastTemps2[i] = this.currentForecast.properties.periods[i].temperature;
      forecastMinTemps2[i] = this.currentForecast.properties.periods[i].minTemperature;
      forecastMaxTemps2[i] = this.currentForecast.properties.periods[i].maxTemperature;
      tempChartLabels2[i] = this.currentForecast.properties.periods[i].endTime;
    }
    this.gotForecast = true;
    this.currentLocation = zip;
    let tempChart = new Chart('tempChart', {
      type: 'line',
      data: {
          labels: tempChartLabels2,
          datasets: [{
            label: 'Temperature',
            data: forcastTemps2,
            backgroundColor: 'rgba(178, 174, 174, 0.2)',
            borderColor: 'grey',
            borderWidth: 2
          },
          {
            label: 'Maximum Temperature',
            data: forecastMaxTemps2,
            backgroundColor: 'rgba(247, 105, 105, 0.2)',
            borderColor: 'red',
            borderWidth: 1
          },
          {
            label: 'Minimum Temperature',
            data: forecastMinTemps2,
            backgroundColor: 'rgba(169, 218, 239, 0.2)',
            borderColor: 'blue',
            borderWidth: 1
          }]
      },
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
          text: '40 Hour Temperature Forecast'
        },
        scales: {
          xAxes: [{
              type: 'time',
              time: {
                  unit: 'hour',
              }
          }]
        }
      }
    });
  }
  }
