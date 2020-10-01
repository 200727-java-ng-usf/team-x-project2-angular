import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Principal } from '../models/principal';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUserSubject: BehaviorSubject<Principal>;

  constructor(private accountService: AccountService) {
    this.currentUserSubject = this.accountService.getCurrentUserSubject();
  }

  ngOnInit(): void {
  }

}
