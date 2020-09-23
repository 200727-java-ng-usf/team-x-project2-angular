import { Component, OnInit } from '@angular/core';
import { Live } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';
import { HomeForecastService } from '../services/home-forecast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private hFService: HomeForecastService) { }

  forecast = [];

  async ngOnInit() {
    let homeForecast = <Object[]> await this.hFService.getForecast('tmd1990@Live.com');

    console.log(homeForecast);

    for (let day of homeForecast) {
      this.forecast.push(day);
    }
  }

  toArray(days: object) {
    return Object.keys(days).map(key => days[key]);
  }

}
