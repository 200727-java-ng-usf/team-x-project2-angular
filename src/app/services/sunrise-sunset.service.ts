import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SunriseSunsetService {

  constructor(private http: HttpClient) { }

  async getSunriseSunset(latitude: number, longitude: number){
    return await this.http.get(env.SUNRISE_SUNSET_API_URL + 'lat=' + latitude + '&lng=' + longitude).toPromise();
  }
  async getSunriseSunsetByDate(latitude: number, longitude: number, date: string){
    return await this.http.get(env.SUNRISE_SUNSET_API_URL + 'lat=' + latitude + '&lng=' + longitude + '&date=' + date).toPromise();
  }
}
