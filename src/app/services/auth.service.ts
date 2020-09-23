import { Injectable } from '@angular/core';
// Http Client
import { HttpClient } from '@angular/common/http';
// Observables
import { BehaviorSubject, Observable } from 'rxjs';
// Principal
import { Principal } from '../models/principal';
// Map
import { map } from 'rxjs/operators';
// Environment
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject: BehaviorSubject<Principal>;

  currentUser$: Observable<Principal>;

  constructor(private http: HttpClient) {
    console.log('Instantiating AuthService');
    this.currentUserSubject = new BehaviorSubject<Principal>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    console.log('AuthService instantiation complete.');
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  authenticate(username: string, password: string) {
    console.log('in authenticate()');

    let credentials = { username, password };

    console.log(`sending credentials, ${credentials}, to ${env.USER_API_URL}/auth`);

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
