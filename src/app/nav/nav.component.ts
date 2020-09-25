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
      linkName: 'Login',
      fragment: '/login'
    },
    {
      linkName: 'Home',
      fragment: '/home'
    },
    {
      linkName: 'Register',
      fragment: '/register'
    },
    {
      linkName: 'Profile',
      fragment: '/profile'
    }
  ];
}
