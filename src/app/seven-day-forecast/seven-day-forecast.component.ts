import { Component, OnInit } from '@angular/core';
import { SevenDayForecastService } from '../services/seven-day-forecast.service';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-seven-day-forecast',
  templateUrl: './seven-day-forecast.component.html',
  styleUrls: ['./seven-day-forecast.component.css']
})
export class SevenDayForecastComponent implements OnInit {
  currentForecast: any = <any>{};
  // ------------------- Temperature Chart ----------------------//
  tempChartLabels: Label[] = [];
  tempChartOptions: ChartOptions = {
    responsive: true
  };
  tempChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    },
    { // Blue
      backgroundColor: 'rgba(179,217,255,0.2)',
      borderColor: 'rgba(51,153,255,1)',
    }
  ];
  tempChartLegend = true;
  tempChartType = 'line';
  tempChartPlugins = [];
  forcastTemps: SingleDataSet = [];
  forecastMaxTemps: SingleDataSet = [];
  forecastMinTemps: SingleDataSet = [];
  tempChartData: ChartDataSets[] = [
    { data: this.forcastTemps, label: 'Temperature' },
    { data: this.forecastMaxTemps, label: 'Maximum Temperature' },
    { data: this.forecastMinTemps, label: 'Minimum Temperature' },
  ];
  // ------------------- Humidity Chart ----------------------//
  forcastHumidity: SingleDataSet = [];
  humidityChartData: ChartDataSets[] = [
    { data: this.forcastHumidity, label: 'Humidity' }
  ];
  humidityChartColors: Color[] = [
    { // Blue
      backgroundColor: 'rgba(179,217,255,0.2)',
      borderColor: 'rgba(51,153,255,1)',
    }
  ];
  constructor(private forecastService: SevenDayForecastService) { }

  async ngOnInit() {
    // Get the forecast from the service
    this.currentForecast = <Object[]> await this.forecastService.getForecast('29150');
    for (let i = 0; i < 40; i++){
      this.forcastTemps[i] = this.currentForecast.list[i].main.temp;
    }
    for (let i = 0; i < 40; i++){
      this.forecastMaxTemps[i] = this.currentForecast.list[i].main.temp_max;
    }
    for (let i = 0; i < 40; i++){
      this.forecastMinTemps[i] = this.currentForecast.list[i].main.temp_min;
    }
    for (let i = 0; i < 40; i++){
      let str = this.currentForecast.list[i].dt_txt;
      let subStr = str.substring(5, str.length - 3);
      this.tempChartLabels[i] = subStr;
    }
    for (let i = 0; i < 40; i++){
      this.forcastHumidity[i] = this.currentForecast.list[i].main.humidity;
    }
  }

}


