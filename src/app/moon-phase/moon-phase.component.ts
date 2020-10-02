import { Component, OnInit } from '@angular/core';
import * as SunCalc from 'node_modules/suncalc/suncalc.js';
import { AccountService } from '../services/account.service';
import { Principal } from '../models/principal';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-moon-phase',
  templateUrl: './moon-phase.component.html',
  styleUrls: ['./moon-phase.component.css']
})
export class MoonPhaseComponent implements OnInit {
  chosenDate = new Date();
  // In line Dao for moon phase info
  moonPhase = [{
    fraction: 0,
    phase: 0,
    angle: 0,
    date: '',
    iconLink: {
      friendlyName: '',
      link: ''
    },
    times: {
      rise: Date,
      set: Date,
      alwaysUp: false,
      alwaysDown: false
    }
  }];
  suncalc = SunCalc;
  currentUserSubject: BehaviorSubject<Principal>;

  constructor( private accountService: AccountService) {
    this.currentUserSubject = accountService.getCurrentUserSubject();
    console.log(this.currentUserSubject);
   }
  today = new Date();

  ngOnInit(): void {
    // Ten Days
    for (let i = 0; i < 30; i++){
      let currentDay = new Date();
      currentDay.setTime( this.today.getTime() + (24 * i) * 60 * 60 * 1000);
      // Get Moon Phase from .js library
      this.moonPhase[i] = this.suncalc.getMoonIllumination(currentDay);
      this.moonPhase[i].date = currentDay.toLocaleDateString();

      // Get Icon info based on day
      this.moonPhase[i].iconLink = this.getMoonImage(this.moonPhase[i].phase);

      // Get Moon Times
      this.moonPhase[i].times = this.suncalc.getMoonTimes(currentDay, 33.92, -80.34);
      console.log(this.moonPhase[i].fraction);
      console.log(this.moonPhase[i].iconLink);
    }
  }

  getMoonImage(mooonFraction: number){
    let icon = {
      friendlyName: '',
      link: ''
    }
    if (mooonFraction < 0 ) { return; }
    if (mooonFraction > 0  && mooonFraction <= 1 / 28) {
      icon.friendlyName = 'New Moon';
      icon.link = 'wi wi-moon-new';
      return icon;
    }
    if (mooonFraction > 1 / 28 && mooonFraction <= 2 / 28) {
      icon.friendlyName = 'Waxing Crescent 1';
      icon.link = 'wi wi-moon-waxing-cresent-1';
      return icon;
    }
    if (mooonFraction > 2 / 28 && mooonFraction <= 3 / 28) {
      icon.friendlyName = 'Waxing Crescent 2';
      icon.link = 'wi wi-moon-waxing-cresent-2';
      return icon;
    }
    if (mooonFraction > 3 / 28 && mooonFraction <= 4 / 28) {
      icon.friendlyName = 'Waxing Crescent 3';
      icon.link = 'wi wi-moon-waxing-cresent-3';
      return icon;
      }
    if (mooonFraction > 4 / 28 && mooonFraction <= 5 / 28) {
      icon.friendlyName = 'Waxing Crescent 4';
      icon.link = 'wi wi-moon-waxing-cresent-4';
      return icon;
    }
    if (mooonFraction > 5 / 28 && mooonFraction <= 6 / 28) {
      icon.friendlyName = 'Waxing Crescent 5';
      icon.link = 'wi wi-moon-waxing-cresent-5';
      return icon;
      }
    if (mooonFraction > 6 / 28 && mooonFraction <= 7 / 28) {
      icon.friendlyName = 'Waxing Crescent 6';
      icon.link = 'wi wi-moon-waxing-cresent-6';
      return icon;
    }
    if (mooonFraction > 7 / 28 && mooonFraction <= 8 / 28) {
      icon.friendlyName = 'First Quarter';
      icon.link = 'wi wi-moon-first-quarter';
      return icon;
    }
    if (mooonFraction > 8 / 28 && mooonFraction <= 9 / 28) {
      icon.friendlyName = 'Waxing Gibbous 1';
      icon.link = 'wi wi-moon-waxing-gibbous-1';
      return icon;
    }
    if (mooonFraction > 9 / 28 && mooonFraction <= 10 / 28) {
      icon.friendlyName = 'Waxing Gibbous 2';
      icon.link = 'wi wi-moon-waxing-gibbous-2';
      return icon;
    }
    if (mooonFraction > 10 / 28 && mooonFraction <= 11 / 28) {
      icon.friendlyName = 'Waxing Gibbous 3';
      icon.link = 'wi wi-moon-waxing-gibbous-3';
      return icon;
    }
    if (mooonFraction > 11 / 28 && mooonFraction <= 12 / 28) {
      icon.friendlyName = 'Waxing Gibbous 4';
      icon.link = 'wi wi-moon-waxing-gibbous-4';
      return icon;
      }
    if (mooonFraction > 12 / 28 && mooonFraction <= 13 / 28) {
      icon.friendlyName = 'Waxing Gibbous 5';
      icon.link = 'wi wi-moon-waxing-gibbous-5';
      return icon;
    }
    if (mooonFraction > 13 / 28 && mooonFraction <= 14 / 28) {
      icon.friendlyName = 'Waxing Gibbous 6';
      icon.link = 'wi wi-moon-waxing-gibbous-6';
      return icon;
     }
    if (mooonFraction > 14 / 28 && mooonFraction <= 15 / 28) {
      icon.friendlyName = 'Full Moon';
      icon.link = 'wi wi-moon-full';
      return icon;
    }
    if (mooonFraction > 15 / 28 && mooonFraction <= 16 / 28) {
      icon.friendlyName = 'Waning Gibbous 1';
      icon.link = 'wi wi-moon-waning-gibbous-1';
      return icon;
    }
    if (mooonFraction > 16 / 28 && mooonFraction <= 17 / 28) {
      icon.friendlyName = 'Waning Gibbous 2';
      icon.link = 'wi wi-moon-waning-gibbous-2';
      return icon;
    }
    if (mooonFraction > 17 / 28 && mooonFraction <= 18 / 28) {
      icon.friendlyName = 'Waning Gibbous 3';
      icon.link = 'wi wi-moon-waning-gibbous-3';
      return icon;
    }
    if (mooonFraction > 18 / 28 && mooonFraction <= 19 / 28) {
      icon.friendlyName = 'Waning Gibbous 4';
      icon.link = 'wi wi-moon-waning-gibbous-4';
      return icon;
      }
    if (mooonFraction > 19 / 28 && mooonFraction <= 20 / 28) {
      icon.friendlyName = 'Waning Gibbous 5';
      icon.link = 'wi wi-moon-waning-gibbous-5';
      return icon;      }
    if (mooonFraction > 20 / 28 && mooonFraction <= 21 / 28) {
      icon.friendlyName = 'Waning Gibbous 6';
      icon.link = 'wi wi-moon-waning-gibbous-6';
      return icon;      }
    if (mooonFraction > 21 / 28 && mooonFraction <= 22 / 28) {
      icon.friendlyName = 'Third Quarter';
      icon.link = 'wi wi-moon-3rd-quarter';
      return icon;
      }
    if (mooonFraction > 22 / 28 && mooonFraction <= 23 / 28) {
      icon.friendlyName = 'Waning Crescent 1';
      icon.link = 'wi wi-moon-waning-crescent-1';
      return icon;
      }
    if (mooonFraction > 23 / 28 && mooonFraction <= 24 / 28) {
      icon.friendlyName = 'Waning Crescent 2';
      icon.link = 'wi wi-moon-waning-crescent-2';
      return icon;
    }
    if (mooonFraction > 24 / 28 && mooonFraction <= 25 / 28) {
      icon.friendlyName = 'Waning Crescent 3';
      icon.link = 'wi wi-moon-waning-crescent-3';
      return icon;
    }
    if (mooonFraction > 25 / 28 && mooonFraction <= 26 / 28) {
      icon.friendlyName = 'Waning Crescent 4';
      icon.link = 'wi wi-moon-waning-crescent-4';
      return icon;
    }
    if (mooonFraction > 26 / 28 && mooonFraction <= 27 / 28) {
      icon.friendlyName = 'Waning Crescent 5';
      icon.link = 'wi wi-moon-waning-crescent-5';
      return icon;
    }
    if (mooonFraction > 27 / 28 && mooonFraction <= 1) {
      icon.friendlyName = 'Waning Crescent 6';
      icon.link = 'wi wi-moon-waning-crescent-6';
      return icon;
    }
  }
}
