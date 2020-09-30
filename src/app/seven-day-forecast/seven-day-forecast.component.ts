import { Component, OnInit, ElementRef } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { ChartOptions, ChartDataSets, Chart } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';


@Component({
  selector: 'app-seven-day-forecast',
  templateUrl: './seven-day-forecast.component.html',
  styleUrls: ['./seven-day-forecast.component.css']
})
export class SevenDayForecastComponent implements OnInit {
  currentForecast: any = <any>{};
  currentUVForecast: any = <any>{};

  favoriteLocations = [];

  constructor(private forecastService: ForecastService, private elementRef: ElementRef) { }

  async ngOnInit() {
    // Get the forecast from the forecast service using hard coded zip
    this.currentForecast = <Object[]> await this.forecastService.getDailyForecast('29150');
    this.currentUVForecast = <Object[]> await this.forecastService.getUVForecast('29150');
    this.fillTempChart(this.currentForecast);
    this.fillHumidityChart(this.currentForecast);
    this.fillUVChart(this.currentUVForecast);
  }
  // ------------------- Temp Chart ----------------------//
  fillTempChart(currentForecast: any = {} as any){
    let forcastTemps2 = [];
    let forecastMaxTemps2 = [];
    let forecastMinTemps2 = [];
    let tempChartLabels2: Label[] = [];
    for (let i = 0; i < 40; i++){
      forcastTemps2[i] = currentForecast.list[i].main.temp;
      forecastMinTemps2[i] = currentForecast.list[i].main.temp_min;
      forecastMaxTemps2[i] = currentForecast.list[i].main.temp_max;
      let str = this.currentForecast.list[i].dt_txt;
      let subStr = str.substring(5, str.length - 3);
      tempChartLabels2[i] = subStr;
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
        }
      }
    });
  }
  // ------------------- Humidity Chart ----------------------//
  fillHumidityChart(currentForecast: any = {} as any){
    let humidityData = [];
    let humidityLabels: Label[] = [];
    for (let i = 0; i < 40; i++){
      humidityData[i] = currentForecast.list[i].main.humidity;
      let str = this.currentForecast.list[i].dt_txt;
      let subStr = str.substring(5, str.length - 3);
      humidityLabels[i] = subStr;
    }
    let humidityChart = new Chart('humidityChart', {
      type: 'line',
      data: {
          labels: humidityLabels,
          datasets: [{
            label: 'Humidity',
            data: humidityData,
            backgroundColor: 'rgba(21, 255, 255, 0.5)',
            borderColor: 'black',
            borderWidth: 2
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
        }
      }
    });
  }
  // ------------------- UV Chart ----------------------//
  fillUVChart(currentUVForecast: any = {} as any){
    let uvData = [];
    let uvLabels: Label[] = [];
    for (let i = 0; i < 8; i++){
      uvData[i] = currentUVForecast[i]?.value;
      uvLabels[i] = '' + i;
    }
    let uvChart = new Chart('uvChart', {
      type: 'line',
      data: {
          labels: uvLabels,
          datasets: [{
            label: 'UV Index',
            data: uvData,
            backgroundColor: 'rgba(255, 99, 71, 0.8)',
            borderColor: 'black',
            borderWidth: 2
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
          text: '8 Hr UV Forecast'
        }
      }
    });
  }

}
