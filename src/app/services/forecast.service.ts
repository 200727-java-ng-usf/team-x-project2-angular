import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { ZipToLatLonService } from '../services/zip-to-lat-lon.service';
import { ZipToLL } from '../models/zip-to-l-l';
import { StationReturn } from '../models/forecastStation';
@Injectable({
  providedIn: 'root'
})
export class ForecastService {


  constructor(private http: HttpClient, private zipster: ZipToLatLonService) { }

  async getLatLonFromZip(zip: string){
    let zipper: ZipToLL = <ZipToLL> await (await this.zipster.getLatLongFromZip(zip));
    return zipper;
  }

  async getDailyForecast(zip: string) {
    // Get station
    let station = <StationReturn> await this.getGovStation(zip);
    // get weather from station
    let currentWeatherCall = env.WEATHER_GOV_API_URL + '/gridpoints/' + station.properties.cwa + '/' + (await station).properties.gridX + ',' + (await station).properties.gridY + '/forecast';
    return await this.http.get(currentWeatherCall, {

    }).toPromise();
  }

  async getGovStation(zip: string){
    let latLong = this.getLatLonFromZip(zip);
    let gridPointCall = env.WEATHER_GOV_API_URL + '/points/' + (await latLong).records[0].fields.latitude + ',' + (await latLong).records[0].fields.longitude;
    return await this.http.get(gridPointCall, {
      // headers: {
      //   'User-Agent':  email
      // }
    }).toPromise();
  }

  async getGovHourlyForecast(zip: string){
    // Get station
    let station = <StationReturn> await this.getGovStation(zip);
    // get weather from station
    let hourlyForecastWeatherCall = env.WEATHER_GOV_API_URL + '/gridpoints/' + station.properties.cwa + '/' + (await station).properties.gridX + ',' + (await station).properties.gridY + '/forecast/hourly';
    return await this.http.get(hourlyForecastWeatherCall, {
      // headers: {
      //   'User-Agent':  email
      // }
    }).toPromise();
  }
}
