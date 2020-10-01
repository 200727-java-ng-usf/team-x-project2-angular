import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ZipToLL } from '../models/zip-to-l-l';
import { ZipToLatLonService } from '../services/zip-to-lat-lon.service';
import * as SunCalc from 'node_modules/suncalc/suncalc.js';
@Injectable({
  providedIn: 'root'
})
export class SunriseSunsetService {
  suncalc = SunCalc;
  constructor(private http: HttpClient,  private zipster: ZipToLatLonService) { }

  async getLatLonFromZip(zip: string){
    let zipper: ZipToLL = <ZipToLL> await (await this.zipster.getLatLongFromZip(zip));
    return zipper;
  }
  async getSunTimesForDay(zip: string, date: Date){
    let latLong = this.getLatLonFromZip(zip);
    return this.suncalc.getTimes(/*Date*/ date,
      /*Number*/ (await latLong).records[0].fields.latitude,
     /*Number*/ (await latLong).records[0].fields.longitude,
     /*Number (default=0)*/ );
  }
}
