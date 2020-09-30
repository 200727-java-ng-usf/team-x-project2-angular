import { Component, OnInit, ElementRef } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { ChartOptions, ChartDataSets, Chart } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { Forecast } from '../models/daily-forecast';

@Component({
  selector: 'app-seven-day-forecast',
  templateUrl: './seven-day-forecast.component.html',
  styleUrls: ['./seven-day-forecast.component.css']
})
export class SevenDayForecastComponent implements OnInit {
  currentForecast: Forecast;
  currentUVForecast: any = <any>{};
  gotForecast = false;
  favoriteLocations = [];

  constructor(private forecastService: ForecastService, private elementRef: ElementRef) { }

  async ngOnInit() {
    // Get the forecast from the forecast service using hard coded zip
    this.currentForecast = <Forecast> await this.forecastService.getDailyForecast('29150');
    this.gotForecast = true;
    this.currentUVForecast = <Object[]> await this.forecastService.getUVForecast('29150');
    this.fillTempChart(this.currentForecast);
    this.fillHumidityChart(this.currentForecast);
    this.fillUVChart(this.currentForecast);
  }
  // ------------------- Temp Chart ----------------------//
  fillTempChart(currentForecast: Forecast){
    let forcastTemps2 = [];
    let forecastMaxTemps2 = [];
    let forecastMinTemps2 = [];
    let tempChartLabels2 = [];
    for (let i = 0; i < 40; i++){
      forcastTemps2[i] = currentForecast.list[i].main.temp;
      forecastMinTemps2[i] = currentForecast.list[i].main.temp_min;
      forecastMaxTemps2[i] = currentForecast.list[i].main.temp_max;
      tempChartLabels2[i] = currentForecast.list[i].dt_txt;
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
  // ------------------- Humidity Chart ----------------------//
  fillHumidityChart(currentForecast: Forecast){
    let humidityData = [];
    let humidityLabels = [];
    for (let i = 0; i < 40; i++){
      humidityData[i] = currentForecast.list[i].main.humidity;
      humidityLabels[i] = currentForecast.list[i].dt_txt;
    }
    let humidityChart = new Chart('humidityChart', {
      type: 'line',
      data: {
        labels: humidityLabels,
        datasets: [{
          label: '\xB0 F',
          data: humidityData,
          backgroundColor: 'rgba(21, 255, 255, 0.03)',
          borderColor: 'black',
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
          text: '40 Hour Humidity Forecast'
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
  // ------------------- UV Chart ----------------------//
  fillUVChart(currentUVForecast: Forecast){
    let uvData = [];
    let uvLabels = [];
    for (let i = 0; i < 40; i++){
      uvData[i] = currentUVForecast.list[i].main.feels_like;
      uvLabels[i] = currentUVForecast.list[i].dt_txt;
    }
    let uvChart = new Chart('uvChart', {
      type: 'line',
      data: {
          labels: uvLabels,
          datasets: [{
            label: '\xB0 F',
            data: uvData,
            backgroundColor: 'rgba(255, 99, 71, 0.03)',
            borderColor: 'black',
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
          text: 'Feels Like'
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
