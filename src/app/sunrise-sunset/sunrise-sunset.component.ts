import { Component, OnInit } from '@angular/core';
import { SunriseSunsetService } from '../services/sunrise-sunset.service';
import { SunriseSunset } from '../models/sunrise-sunset';
@Component({
  selector: 'app-sunrise-sunset',
  templateUrl: './sunrise-sunset.component.html',
  styleUrls: ['./sunrise-sunset.component.css']
})
export class SunriseSunsetComponent implements OnInit {

  riseSet: SunriseSunset = new SunriseSunset();
  riseSetForecast: SunriseSunset[];
  latitude: number;
  logitude: number;
  today = new Date();
  altDate = new Date();
  constructor(private riseSetService: SunriseSunsetService) { }

  async ngOnInit() {
    await this.getRiseSetToday(33.9, -80.3);
  }

  async getRiseSetToday(lat: number, lon: number){
    this.riseSet = <SunriseSunset> await (await this.riseSetService.getSunriseSunset(lat, lon));
  }

  async getRiseSetForDate(lat: number, lon: number, date: string){
    this.riseSet = <SunriseSunset> await (this.riseSetService.getSunriseSunsetByDate(lat, lon, date));
  }
}
