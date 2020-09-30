import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  async getDailyForecast(zip: string) {
    let currentWeatherCall = env.OPEN_WEATHER_API_URL + '/forecast?' + 'zip=' + zip + ',us' + '&appid=' + env.OPEN_WEATHER_API_KEY + '&units=imperial';
    return await this.http.get(currentWeatherCall, {

    }).toPromise();
  }
  async getUVForecast(zip: string) {
    let currentWeatherCall = env.OPEN_WEATHER_API_URL + '/uvi/forecast?' + 'lat=' + 83 + '&lon=' + 30 + '&appid=' + env.OPEN_WEATHER_API_KEY;
    return await this.http.get(currentWeatherCall, {

    }).toPromise();
  }
  async getGovStation(lat: number, lon: number){
    let gridPointCall = env.WEATHER_GOV_API_URL + '/points/' + lat + ',' + lon;
    return await this.http.get(gridPointCall, {
      // headers: {
      //   'User-Agent':  email
      // }
    }).toPromise();
  }

  async getGovHourlyForecast(gridPointX: number, gridPointY: number, station: string){
    let hourlyForecastWeatherCall = env.WEATHER_GOV_API_URL + '/gridpoints/' + station + '/' + gridPointX + ',' + gridPointY + '/forecast/hourly';
    return await this.http.get(hourlyForecastWeatherCall, {
      // headers: {
      //   'User-Agent':  email
      // }
    }).toPromise();
  }
}
