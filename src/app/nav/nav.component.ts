import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{

  principal: Principal;

  currentUserSubject: BehaviorSubject<Principal>
  currentUser$: Observable<Principal>

  // Nav Links
  navLinks = [
    
  ];
  navLinksForNonAuthenticated = [
    {
      linkName: 'Login',
      fragment: '/login'
    },
    {
      linkName: 'Register',
      fragment: '/register'
    },
  ]
  navLinksForAuthenticated = [
    {
      linkName: 'Home',
      fragment: '/home'
    },
    {
      linkName: 'Daily Forecast',
      fragment: '/forecast'
    },
    {
      linkName: 'Hourly Forecast',
      fragment: '/hourly-forecast'
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
    },
    {
      linkName: 'Profile',
      fragment: '/profile'
    },
    // {
    //   linkName: 'Logout',
    //   fragment: '/logout' //fragment not neccessary
    // }
  ]
  adminNavLinks = [
    {
      linkName: 'View All Users',
      fragment: '/adminViewAllUsers'
    },
    {
      linkName: 'Update User',
      fragment: 'adminUpdateUser'
    }
  ]

  /*private currentUserSubject: BehaviorSubject<Principal>
  currentUser$: Observable<Principal>

  constructor(private http: HttpClient) {
    console.log('in AccountService.AccountService()');
    this.currentUserSubject = new BehaviorSubject<Principal>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }*/

  constructor(private accountService: AccountService, private router: Router) {

    this.currentUserSubject = accountService.getCurrentUserSubject();

  }



  logout() {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }

}
