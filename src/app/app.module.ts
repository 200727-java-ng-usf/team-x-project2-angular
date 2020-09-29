import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Http Client Module
import { HttpClientModule } from '@angular/common/http';
// Charts
import { ChartsModule } from 'ng2-charts';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SevenDayForecastComponent } from './seven-day-forecast/seven-day-forecast.component';
import { PastWeatherComponent } from './past-weather/past-weather.component';
import { SunriseSunsetComponent } from './sunrise-sunset/sunrise-sunset.component';
import { MoonPhaseComponent } from './moon-phase/moon-phase.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    SevenDayForecastComponent,
    PastWeatherComponent,
    SunriseSunsetComponent,
    MoonPhaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
