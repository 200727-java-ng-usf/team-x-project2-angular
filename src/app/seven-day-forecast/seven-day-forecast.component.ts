import { Component, OnInit } from '@angular/core';
import { SevenDayForecastService } from '../services/seven-day-forecast.service';

@Component({
  selector: 'app-seven-day-forecast',
  templateUrl: './seven-day-forecast.component.html',
  styleUrls: ['./seven-day-forecast.component.css']
})
export class SevenDayForecastComponent implements OnInit {

  currentForecast: any = <any>{};

  forcastTemps = [];
  forcastHumidity = [];

  constructor(private forecastService: SevenDayForecastService) { }

  async ngOnInit() {
    this.currentForecast = <Object[]> await this.forecastService.getForecast('29150');
    for (let i = 0; i < 40; i++){
      this.forcastTemps[i] = this.currentForecast.list[i].main.temp;
    }
    var ctx = document.getElementById('myChart');

    for (let i = 0; i < 40; i++){
      this.forcastHumidity[i] = this.currentForecast.list[i].main.humidity;
    }
    console.log(this.forcastTemps);
    console.log(this.currentForecast);

  }

}
