import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeForecastService {

  constructor(private http: HttpClient) { }

  async getForecast(zip: string) {
    let currentWeatherCall = env.OPEN_WEATHER_API_URL + '/weather?' + 'zip=' + zip + ',us' + '&appid=' + env.OPEN_WEATHER_API_KEY;
    return await this.http.get(currentWeatherCall, {

    }).toPromise();
  }
}
