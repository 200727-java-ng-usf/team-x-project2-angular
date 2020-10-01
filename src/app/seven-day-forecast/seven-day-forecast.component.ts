import { Component, OnInit, ElementRef } from '@angular/core';
import { ForecastService } from '../services/forecast.service';

import { ChartOptions, ChartDataSets, Chart } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { Forecast } from '../models/daily-forecast';
import { StationReturn } from '../models/forecastStation';
import { Principal } from '../models/principal';

@Component({
  selector: 'app-seven-day-forecast',
  templateUrl: './seven-day-forecast.component.html',
  styleUrls: ['./seven-day-forecast.component.css']
})
export class SevenDayForecastComponent implements OnInit {
  currentForecast: Forecast;
  gotForecast = false;
  favoriteLocations = [];
  station: StationReturn;
  constructor(private forecastService: ForecastService, private elementRef: ElementRef) { }

  async ngOnInit() {
    // Get the forecast from the forecast service using hard coded zip


    this.getForecast('90210');

  }

  async getForecast(zip: string){
    this.currentForecast = <Forecast> await (await this.forecastService.getDailyForecast(zip).then());
    this.gotForecast = true;
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
