import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ZipToLatLonService {

  constructor(private http: HttpClient) { }

  async getLatLongFromZip(zip: number){
    let currentWeatherCall = env.ZIP_TO_LAT_LONG_URL + zip + '&facet=state&facet=timezone&facet=dst';
    return await this.http.get(currentWeatherCall, {

    }).toPromise();
  }
}
