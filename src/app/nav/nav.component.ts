import { Component, OnInit } from '@angular/core';
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

  /*private currentUserSubject: BehaviorSubject<Principal>
  currentUser$: Observable<Principal>

  constructor(private http: HttpClient) {
    console.log('in AccountService.AccountService()');
    this.currentUserSubject = new BehaviorSubject<Principal>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }*/

  // Nav Links
  navLinks = [
    {
      linkName: 'Home',
      fragment: '/home'
    },
    
    {
      linkName: 'Forecast',
      fragment: '/forecast'
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
  ];
  navLinksForNonAuthenticated = [
    {
      linkName: 'Login',
      fragment: '/login'
    },
    {
      linkName: 'Register',
      fragment: '/register'
    }
  ]
  navLinksForAuthenticated = [
    {
      linkName: 'Profile',
      fragment: '/profile'
    },
    {
      linkName: 'Logout',
      fragment: '/logout' //fragment not neccessary
    }
  ]

  constructor(private accountService: AccountService) {

    this.currentUserSubject = accountService.getCurrentUserSubject();
    
  }

  

  logout() {
    this.accountService.logout();
  }

}
