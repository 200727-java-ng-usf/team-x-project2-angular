import { Component, OnInit } from '@angular/core';
import { HomeForecastService } from '../services/home-forecast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentWeather: any = <any>{};
  currentWeatherDescription = '';
  xurrentWeatherIconId = '';
  constructor(private hFService: HomeForecastService) { }



  async ngOnInit() {
    this.currentWeather = <Object[]> await this.hFService.getForecast('29150');
    this.currentWeatherDescription = this.currentWeather.weather[0].description;
    this.xurrentWeatherIconId = this.currentWeather.weather[0].icon;
    console.log(this.currentWeather);
  }

  resultFound() {
    return Object.keys(this.currentWeather).map(key => this.currentWeather[key]);
  }

}
