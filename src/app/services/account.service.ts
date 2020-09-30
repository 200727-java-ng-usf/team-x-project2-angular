import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject: BehaviorSubject<Principal>
  currentUser$: Observable<Principal>

  constructor(private http: HttpClient) {
    console.log('in AccountService.AccountService()');
    this.currentUserSubject = new BehaviorSubject<Principal>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  register(username: string, password: string, firstName: string, lastName: string, email: string) {

    console.log('in AccountService.register()');
    let appUser = {username, password, firstName, lastName, email};

    console.log(`sending app user ${appUser}, to ${env.USER_API_URL}/users as POST`);

    return this.http.post(`${env.USER_API_URL}/users`, appUser, {
      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response'
    }).pipe(

      map(resp => {
        console.log("RESP: " + resp);
        let principal = resp.body as Principal;
        this.currentUserSubject.next(principal);
      })

    );

  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getCurrentUserSubject() {
    return this.currentUserSubject;
  }

  authenticate(username: string, password: string) {
    console.log('in AccountService.authenticate()');

    let credentials = { username, password };

    console.log(`sending credentials, ${credentials}, to ${env.USER_API_URL}/auth as POST`);

    return this.http.post(`${env.USER_API_URL}/auth`, credentials, {
      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response'
    }).pipe(
      map(resp => {
        let principal = resp.body as Principal;
        this.currentUserSubject.next(principal);
      })
    );
  }

  logout(): void {
    this.http.get(`${env.USER_API_URL}/auth`);
    this.currentUserSubject.next(null);
  }

}
