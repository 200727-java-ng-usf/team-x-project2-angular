import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { map } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private currentUserSubject: BehaviorSubject<Principal>;
  currentUser$: Observable<Principal>;
  constructor() { }
}
