import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SevenDayForecastComponent } from './seven-day-forecast/seven-day-forecast.component';
import { PastWeatherComponent } from './past-weather/past-weather.component';
import { SunriseSunsetComponent } from './sunrise-sunset/sunrise-sunset.component';
import { MoonPhaseComponent } from './moon-phase/moon-phase.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { ProfileComponent } from './profile/profile.component';
import { GetAllUsersComponent } from './get-all-users/get-all-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'forecast', component: SevenDayForecastComponent},
  { path: 'past-weather', component: PastWeatherComponent},
  { path: 'rise-set', component: SunriseSunsetComponent},
  { path: 'moon-phase', component: MoonPhaseComponent},
  { path: 'hourly-forecast', component: HourlyForecastComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'adminViewAllUsers', component: GetAllUsersComponent},
  { path: 'adminUpdateUser', component: UpdateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
