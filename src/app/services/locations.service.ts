import { HttpClient } from '@angular/common/http';
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
    currentUserSubject: BehaviorSubject<Principal>;
  constructor(private http: HttpClient, private accountService: AccountService) {
    console.log('in LocationService.LocationService()');
    // this.currentLocationsSubject = new BehaviorSubject<Location[]>(null);
    // this.currentUserLocations$ = this.currentLocationsSubject.asObservable();
    this.currentUserSubject = accountService.getCurrentUserSubject();

   }


  async getFavoriteLocations(){
    console.log("getting user favorite locations");
    return await this.http.get(`${env.USER_API_URL}/user/location/favorites`, {

    }).toPromise();
  }

}
