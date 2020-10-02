import { Component, OnInit } from '@angular/core';
import { HomeForecastService } from '../services/home-forecast.service';
import { AccountService } from '../services/account.service';
import { LocationsService } from '../services/locations.service';
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
  locations: Location[] = [{city: 'sumter',country: 'us',locationId: 1, locationZipCode: '29150', state: 'SC'}];
  updating = false;
  updateForm = new FormGroup({
    location: new FormControl('', Validators.required)
  });
  currentUserSubject: BehaviorSubject<Principal>;

  constructor(private hFService: HomeForecastService, private accountService: AccountService, private formBuilder: FormBuilder, private locationService: LocationsService) {
    this.currentUserSubject = accountService.getCurrentUserSubject();
    this.locationService.getFavoriteLocations();
    console.log(this.currentUserSubject);
    console.log(this.currentUserSubject);
    this.locations = <Location[]> JSON.parse(localStorage.getItem('locations'));
   }

  async ngOnInit() {

    this.getCurrentWeather(this.currentUserSubject.value.home.locationZipCode);


  }


  get updateFields() {
    return this.updateForm.controls;
  }

  async updateLocation(){
    this.getCurrentWeather(this.updateFields.location.value);
  }
  async getCurrentWeather(zip: string){
    this.updating = true;
    this.currentWeather = <Object[]> await this.hFService.getForecast(zip);
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
