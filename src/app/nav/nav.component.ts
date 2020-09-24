import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{

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
    }
  ];
}
