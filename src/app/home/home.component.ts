import { Component, OnInit } from '@angular/core';
import { HomeForecastService } from '../services/home-forecast.service';
import { AccountService } from '../services/account.service';
import { Principal } from '../models/principal';
import { Location } from '../models/location';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentWeather: any = <any>{};
  currentWeatherDescription = '';
  currentWeatherIconId = 0;
  thunderstorm = false;
  drizzle = false;
  rain = false;
  snow = false;
  clear = false;
  clouds = false;
  atmosphere = false;
  locations: Location[] = [{city: 'sumter',country: 'us',location_id: 1, location_zip_code: '29150', state: 'SC'}];
  updating = false;
  updateForm = new FormGroup({
    location: new FormControl('', Validators.required)
  });
  currentUserSubject: BehaviorSubject<Principal>;

  constructor(private hFService: HomeForecastService, private accountService: AccountService, private formBuilder: FormBuilder) {
    this.currentUserSubject = accountService.getCurrentUserSubject();
    console.log(this.currentUserSubject);
   }

  async ngOnInit() {
    // harcoded zipcode for now, will get from current user
    this.currentWeather = <Object[]> await this.hFService.getForecast(this.currentUserSubject.value.home.locationZipCode);
    this.currentWeatherDescription = this.currentWeather.weather[0].description;
    this.currentWeatherIconId = this.currentWeather.weather[0].id;
    // determine the current condition using: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    if(this.currentWeatherIconId >= 200 && this.currentWeatherIconId < 300){
      this.thunderstorm = true;
    }
    if(this.currentWeatherIconId >= 300 && this.currentWeatherIconId < 400){
      this.drizzle = true;
    }
    if(this.currentWeatherIconId >= 500 && this.currentWeatherIconId < 600){
      this.rain = true;
    }
    if(this.currentWeatherIconId >= 600 && this.currentWeatherIconId < 700){
      this.snow = true;
    }
    if(this.currentWeatherIconId >= 700 && this.currentWeatherIconId < 800){
      this.atmosphere = true;
    }
    if(this.currentWeatherIconId === 800 ){
      this.clear = true;
    }
    if(this.currentWeatherIconId > 800  && this.currentWeatherIconId < 900 ){
      this.clouds = true;
    }
    console.log(this.currentWeather);
  }
  get updateFields() {
    return this.updateForm.controls;
  }
  async updateLocation(){
    this.updating = true;
    this.currentWeather = <Object[]> await this.hFService.getForecast(this.updateFields.location.value);
    this.currentWeatherDescription = this.currentWeather.weather[0].description;
    this.currentWeatherIconId = this.currentWeather.weather[0].id;
    // determine the current condition using: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    if(this.currentWeatherIconId >= 200 && this.currentWeatherIconId < 300){
      this.thunderstorm = true;
    }
    if(this.currentWeatherIconId >= 300 && this.currentWeatherIconId < 400){
      this.drizzle = true;
    }
    if(this.currentWeatherIconId >= 500 && this.currentWeatherIconId < 600){
      this.rain = true;
    }
    if(this.currentWeatherIconId >= 600 && this.currentWeatherIconId < 700){
      this.snow = true;
    }
    if(this.currentWeatherIconId >= 700 && this.currentWeatherIconId < 800){
      this.atmosphere = true;
    }
    if(this.currentWeatherIconId === 800 ){
      this.clear = true;
    }
    if(this.currentWeatherIconId > 800  && this.currentWeatherIconId < 900 ){
      this.clouds = true;
    }
    console.log(this.currentWeather);
    this.updating = false;
  }
  get selectedLocation(): any{
    return this.updateForm.get('selectedLocation');
  }
  resultFound() {
    return Object.keys(this.currentWeather).map(key => this.currentWeather[key]);
  }

}
