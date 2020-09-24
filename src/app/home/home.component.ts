import { Component, OnInit } from '@angular/core';
import { HomeForecastService } from '../services/home-forecast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentWeather: any = <any>{};

  constructor(private hFService: HomeForecastService) { }



  async ngOnInit() {
    this.currentWeather = <Object[]> await this.hFService.getForecast('tmd1990@Live.com');

    console.log(this.currentWeather);

  }

  resultFound() {
    return Object.keys(this.currentWeather).map(key => this.currentWeather[key]);
  }

}
