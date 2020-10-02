import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.css']
})
export class GetAllUsersComponent implements OnInit {

  private data;
  accountService: AccountService


  constructor(accountService: AccountService) {
    this.accountService = accountService;
    this.accountService.getAllUsers();
  }

  ngOnInit(): void {
  }



}
