import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // currentUserSubject will be set upon successful registration (like logging in)
  private currentUserSubject: BehaviorSubject<Principal>
  currentUser$: Observable<Principal>

  constructor(private http: HttpClient) {
    console.log('Instantiating Register Service');
    this.currentUserSubject = new BehaviorSubject<Principal>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    console.log('RegisterService instantiation complete');
  }

  register(username: String, password: String, firstName: String, lastName: String, email: String) {
    
    console.log("in register()");
    let credentials = { username, password, firstName, lastName, email };

    console.log(`sending credentials, ${credentials}, to ${env.USER_API_URL}/register`);

    return this.http.post(`${env.USER_API_URL}/register`, credentials, {
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

}
