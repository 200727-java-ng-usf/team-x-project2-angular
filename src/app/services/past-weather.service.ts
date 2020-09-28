import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PastWeatherService {
  stationsFound;
  constructor(private http: HttpClient) { }

  async searchForStation(searchTerm: string){
    return await this.http.get(env.PAST_WEATHER_SEARCH_API_URL + searchTerm, {
      headers:
      {
        'x-api-key': env.PAST_WEATHER_API_KEY
      }
    }).toPromise();
  }

  async getHistory(hourlyDaily: string, station: string, start: string, end: string){
    return await this.http.get(env.PAST_WEATHER_API_URL + hourlyDaily + '?station=' + station + '&start=' + start + '&end=' + end, {
      headers:
      {
        'x-api-key': env.PAST_WEATHER_API_KEY
      }
    }).toPromise();
  }

}
