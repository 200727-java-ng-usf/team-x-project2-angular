import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HomeForecastService {

  constructor(private http: HttpClient) { }

  async getForecast(email: string) {
    return await this.http.get('https://api.weather.gov/gridpoints/CAE/89,59', {

    }).toPromise();
  }
}
