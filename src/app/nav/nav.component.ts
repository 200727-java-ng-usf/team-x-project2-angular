import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{

  constructor(private accountService: AccountService) {

  }

  // Nav Links
  navLinks = [
    {
      linkName: 'Home',
      fragment: '/home'
    },
    {
      linkName: 'Login',
      fragment: '/login'
    },
    {
      linkName: 'Register',
      fragment: '/register'
    },
    {
      linkName: 'Dialy Forecast',
      fragment: '/forecast'
    },
    {
      linkName: 'Hourly Forecast',
      fragment: '/hourly-forecast'
    },
    {
      linkName: 'Profile',
      fragment: '/profile'
    },
    {
      linkName: 'Past Weather',
      fragment: '/past-weather'
    },
    {
      linkName: 'Sunrise/ Sunset',
      fragment: '/rise-set'
    },
    {
      linkName: 'Moon Phase',
      fragment: '/moon-phase'
    }
  ];
}
