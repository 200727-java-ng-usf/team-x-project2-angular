import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';
import { Location } from '../models/location';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private currentLocationsSubject: BehaviorSubject<Location[]>;
  currentUserLocations$: Observable<Location[]>;
  constructor(private http: HttpClient) { }

  get currentLocationsValue() {
    return this.currentLocationsSubject.value;
  }

  getCurrentLocationsSubject() {
    return this.currentLocationsSubject;
  }
  getFavoriteLocations(){
    return this.http.get(`${env.USER_API_URL}/user/location/favorites`, {}).pipe(
      map(resp => {
        console.log("RESP: " + resp);
        let locations = resp as Location[];
        this.currentLocationsSubject.next(locations);
        console.log(resp);
      })
    );
  }

}
