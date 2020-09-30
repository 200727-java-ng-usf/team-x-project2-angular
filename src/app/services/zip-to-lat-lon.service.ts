import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ZipToLatLonService {

  constructor(private http: HttpClient) { }

  async getLatLongFromZip(zip: number){
    let currentWeatherCall = env.OPEN_WEATHER_API_URL + '/forecast?' + 'zip=' + zip + ',us' + '&appid=' + env.OPEN_WEATHER_API_KEY + '&units=imperial';
    return await this.http.get(currentWeatherCall, {

    }).toPromise();
  }
}
