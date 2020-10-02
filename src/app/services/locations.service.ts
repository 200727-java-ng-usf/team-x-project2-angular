import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';
import { Location } from '../models/location';
import { AccountService } from '../services/account.service';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private currentLocationsSubject: BehaviorSubject<Location[]>;
  currentUserLocations$: Observable<Location[]>;
  // currentUserSubject: BehaviorSubject<Principal>;
  constructor(private http: HttpClient, private accountService: AccountService) {
    console.log('in LocationService.LocationService()');
    this.currentLocationsSubject = new BehaviorSubject<Location[]>(null);
    this.currentUserLocations$ = this.currentLocationsSubject.asObservable();

   }

   get currentLocationValue() {

    return this.currentLocationsSubject.value;
  }

  getCurrentLocationSubject() {

    return this.currentLocationsSubject;
  }

  addLocation( aLocation: Location){
    return this.http.post(`${env.USER_API_URL}/locations`, aLocation, {
      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response',
      reportProgress: true,
      withCredentials: true,
    })
    .pipe(
      map(resp => {
        console.log('RESP: ' + resp);
        let location = resp.body as Location;
        localStorage.setItem('location', JSON.stringify(location));
        console.log(location);
        // this.currentLocationsSubject.next(location);
      })
    );
  }

  getFavoriteLocations(){
    let principal = {
      username: this.accountService.getCurrentUserSubject().value.username,
      userId: this.accountService.getCurrentUserSubject().value.userId,
      userRole: this.accountService.getCurrentUserSubject().value.userRole,
      home: this.accountService.getCurrentUserSubject().value.home
    };
    console.log("getting user favorite locations");


    return this.http.get(`${env.USER_API_URL}/user/location/favorites`, {
      withCredentials: true,
      // headers:{


      // },
      observe: 'response',
      reportProgress: true
    })
    // .toPromise();
    .pipe(
      map(resp => {
        console.log('RESP: ' + resp);
        let location = resp.body as Location[];
        localStorage.setItem('locations', JSON.stringify(location));
        console.log(location);
        this.currentLocationsSubject.next(location);
      })
    );
  }

}
