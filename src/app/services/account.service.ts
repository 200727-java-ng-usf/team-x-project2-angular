import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject: BehaviorSubject<Principal>;
  currentUser$: Observable<Principal>;
  cookieValue;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    console.log('in AccountService.AccountService()');
    this.currentUserSubject = new BehaviorSubject<Principal>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  register(username: string, password: string, firstName: string, lastName: string, email: string) {

    console.log('in AccountService.register()');
    let appUser = {username, password, firstName, lastName, email};

    console.log(`sending app user ${appUser}, to ${env.USER_API_URL}/users as POST`);

    return this.http.post(`${env.USER_API_URL}/users`, appUser, {

      withCredentials: true,

      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response'
    }).pipe(

      map(resp => {
        console.log("RESP: " + resp);
        let principal = resp.body as Principal;
        this.currentUserSubject.next(principal);
        localStorage.setItem('principal', JSON.stringify(principal));
        console.log('COOOKIEEEE');
        console.log(this.cookieService.get('JSESSIONID'));
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

      withCredentials: true,

      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response'
    }).pipe(
      map(resp => {
        let principal = resp.body as Principal;
        localStorage.setItem('principal', JSON.stringify(principal));
        let user = JSON.parse(localStorage.getItem('principal'));
        console.log('parsed user: ');
        console.log(user);
        this.currentUserSubject.next(principal);
        localStorage.setItem('principal', JSON.stringify(principal));
        console.log("Current User: ");
        console.log(this.currentUserSubject.value);
        console.log('COOOKIEEEE');
        console.log(this.cookieService.get('JSESSIONID'));
      })
    );
  }

  // find out the actual endpoint and http method 
  updatePassword(newPassword: string) {
    console.log('in AccountService.updatePassword()');

    console.log('COOOKIEEEE');
    console.log(this.cookieService.get('JSESSIONID'));
    console.log(document.cookie);

    let userBody = {
      userId: this.currentUserSubject.value.userId,
      password: newPassword,
      username: this.currentUserSubject.value.username,
      userRole: this.currentUserSubject.value.userRole,
      home: this.currentUserSubject.value.home
    };
    console.log(newPassword + " " + " " + " " + " " + " " + " " + newPassword)
    console.log(`sending userBody, ${userBody}, to ${env.USER_API_URL}/users as PUT`);

    return this.http.put(`${env.USER_API_URL}/users/password?password=${newPassword}`, userBody, {
      
      withCredentials: true,
      
      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response'
    }).pipe(
      map(resp => {
        let principal = resp.body as Principal;
        this.currentUserSubject.next(principal);
        console.log("Current User: ");
        console.log(this.currentUserSubject.value);
        localStorage.setItem('principal', JSON.stringify(principal));
      })
    );

  }

  logout(): void {
    let userBody = {
      userId: this.currentUserSubject.value.userId,
      //password: newPassword,
      username: this.currentUserSubject.value.username,
      userRole: this.currentUserSubject.value.userRole,
      home: this.currentUserSubject.value.home
    };
    this.http.get(`${env.USER_API_URL}/auth`);
    this.currentUserSubject.next(null);
  }

}
