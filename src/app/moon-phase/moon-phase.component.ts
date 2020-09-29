import { Component, OnInit } from '@angular/core';
import * as SunCalc from 'node_modules/suncalc/suncalc.js';

@Component({
  selector: 'app-moon-phase',
  templateUrl: './moon-phase.component.html',
  styleUrls: ['./moon-phase.component.css']
})
export class MoonPhaseComponent implements OnInit {

  chosenDate = new Date();
  moonPhase = [{
    fraction: 0,
    phase: 0,
    angle: 0,
    date: '',
    iconLink: ''
  }];
  suncalc = SunCalc;
  constructor() { }
  today = new Date();

  ngOnInit(): void {
    for (let i = 0; i < 5; i++){
      let currentDay = new Date();
      currentDay.setTime( this.today.getTime() + (24 * i) * 60 * 60 * 1000);
      this.moonPhase[i] = this.suncalc.getMoonIllumination(currentDay);
      this.moonPhase[i].date = currentDay.toLocaleDateString();
      this.moonPhase[i].iconLink = this.getMoonImage(this.moonPhase[i].fraction);
      console.log(this.moonPhase[i].fraction);
      console.log(this.moonPhase[i].iconLink);
    }
  }

  getMoonImage(mooonFraction: number){
    if (mooonFraction < 0 ) { return; }
    if (mooonFraction > 0  && mooonFraction < 1 / 28) { return '../../assets/svg/wi-moon-alt-new.svg'; }
    if (mooonFraction > 1 / 28 && mooonFraction < 2 / 28) { return '../../assets/svg/wi-moon-alt-waxing-crescent-1.svg'; }
    if (mooonFraction > 2 / 28 && mooonFraction < 3 / 28) { return '../../assets/svg/wi-moon-alt-waxing-crescent-2.svg'; }
    if (mooonFraction > 3 / 28 && mooonFraction < 4 / 28) { return '../../assets/svg/wi-moon-alt-waxing-crescent-3.svg'; }
    if (mooonFraction > 4 / 28 && mooonFraction < 5 / 28) { return '../../assets/svg/wi-moon-alt-waxing-crescent-4.svg'; }
    if (mooonFraction > 5 / 28 && mooonFraction < 6 / 28) { return '../../assets/svg/wi-moon-alt-waxing-crescent-5.svg'; }
    if (mooonFraction > 6 / 28 && mooonFraction < 7 / 28) { return '../../assets/svg/wi-moon-alt-waxing-crescent-6.svg'; }
    if (mooonFraction > 7 / 28 && mooonFraction < 8 / 28) { return '../../assets/svg/wi-moon-alt-first-quarter.svg'; }
    if (mooonFraction > 8 / 28 && mooonFraction < 9 / 28) { return '../../assets/svg/wi-moon-alt-waxing-gibbous-1.svg'; }
    if (mooonFraction > 9 / 28 && mooonFraction < 10 / 28) { return '../../assets/svg/wi-moon-alt-waxing-gibbous-2.svg'; }
    if (mooonFraction > 10 / 28 && mooonFraction < 11 / 28) { return '../../assets/svg/wi-moon-alt-waxing-gibbous-3.svg'; }
    if (mooonFraction > 11 / 28 && mooonFraction < 12 / 28) { return '../../assets/svg/wi-moon-alt-waxing-gibbous-4.svg'; }
    if (mooonFraction > 12 / 28 && mooonFraction < 13 / 28) { return '../../assets/svg/wi-moon-alt-waxing-gibbous-5.svg'; }
    if (mooonFraction > 13 / 28 && mooonFraction < 14 / 28) { return '../../assets/svg/wi-moon-alt-waxing-gibbous-6.svg'; }
    if (mooonFraction > 14 / 28 && mooonFraction < 15 / 28) { return '../../assets/svg/wi-moon-alt-full.svg'; }
    if (mooonFraction > 15 / 28 && mooonFraction < 16 / 28) { return '../../assets/svg/wi-moon-alt-waning-gibbous-1.svg'; }
    if (mooonFraction > 16 / 28 && mooonFraction < 17 / 28) { return '../../assets/svg/wi-moon-alt-waning-gibbous-2.svg'; }
    if (mooonFraction > 17 / 28 && mooonFraction < 18 / 28) { return '../../assets/svg/wi-moon-alt-waning-gibbous-3.svg'; }
    if (mooonFraction > 18 / 28 && mooonFraction < 19 / 28) { return '../../assets/svg/wi-moon-alt-waning-gibbous-4.svg'; }
    if (mooonFraction > 19 / 28 && mooonFraction < 20 / 28) { return '../../assets/svg/wi-moon-alt-waning-gibbous-5.svg'; }
    if (mooonFraction > 20 / 28 && mooonFraction < 21 / 28) { return '../../assets/svg/wi-moon-alt-waning-gibbous-6.svg'; }
    if (mooonFraction > 21 / 28 && mooonFraction < 22 / 28) { return '../../assets/svg/wi-moon-alt-third-quarter.svg'; }
    if (mooonFraction > 22 / 28 && mooonFraction < 23 / 28) { return '../../assets/svg/wi-moon-alt-waning-crescent-1.svg'; }
    if (mooonFraction > 23 / 28 && mooonFraction < 24 / 28) { return '../../assets/svg/wi-moon-alt-waning-crescent-2.svg'; }
    if (mooonFraction > 24 / 28 && mooonFraction < 25 / 28) { return '../../assets/svg/wi-moon-alt-waning-crescent-3.svg'; }
    if (mooonFraction > 25 / 28 && mooonFraction < 26 / 28) { return '../../assets/svg/wi-moon-alt-waning-crescent-4.svg'; }
    if (mooonFraction > 26 / 28 && mooonFraction < 27 / 28) { return '../../assets/svg/wi-moon-alt-waning-crescent-5.svg'; }
    if (mooonFraction > 27 / 28 && mooonFraction < 1) { return '../../assets/svg/wi-moon-alt-waning-crescent-6.svg'; }
  }
}
