import { Component, OnInit, ElementRef } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { ChartOptions, ChartDataSets, Chart } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { WeatherGov } from '../models/weather_gov';
import { StationReturn } from '../models/forecastStation';
@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.css']
})
export class HourlyForecastComponent implements OnInit {
  forecast: WeatherGov;
  station: StationReturn;
  constructor(private forecastService: ForecastService, private elementRef: ElementRef) { }
  gotForecast = false;
  async ngOnInit() {
    this.getStation( 33.9, -80.3);
  }

  async getForecast(gridPointX: number, gripPointY: number, station: string){
    this.forecast = <WeatherGov> await (await this.forecastService.getGovHourlyForecast(gridPointX, gripPointY, station));
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

  async getStation(lat: number, lon: number){
    this.station = <StationReturn> await (await this.forecastService.getGovStation( lat, lon));
    console.log(this.station.properties);
    this.getForecast(this.station.properties.gridX, this.station.properties.gridY, this.station.properties.gridId);
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
