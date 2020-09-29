import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moon-phase',
  templateUrl: './moon-phase.component.html',
  styleUrls: ['./moon-phase.component.css']
})
export class MoonPhaseComponent implements OnInit {

  chosenDate = new Date();

  constructor() { }

  ngOnInit(): void {
    console.log(this.calculateMoonPhase(new Date()));
  }

  calculateMoonPhase(date: Date){
    console.log("Requested Date is: " + date);
    let firstMoonSeconds  = Date.UTC(2000, 0O1, 0O6, 18, 14);
    console.log("First Moon Seconds: " + firstMoonSeconds);
    let chosenDaySeconds = Date.UTC(date.getFullYear(),
                                    date.getMonth(),
                                    date.getDay(),
                                    date.getHours(),
                                    date.getMinutes(),
                                    date.getSeconds());
    console.log("Chosen Day Seconds: " + chosenDaySeconds);

    let totalSecs = chosenDaySeconds - firstMoonSeconds ;
    console.log("Total Seconds: " + totalSecs);

    let lunarConstant = 29.53058770576;
    let lunarSeconds = lunarConstant * (24 * 60 * 60);

    console.log("Lunar Seconds: " + lunarSeconds);
    let currentSeconds = totalSecs % lunarSeconds;

    console.log("Current Seconds: " + currentSeconds);

    if(currentSeconds < 0){
      currentSeconds += lunarSeconds;
    }

    let currentMoonFraction = currentSeconds / lunarSeconds;
    console.log("Current Moon Fraction : " + currentMoonFraction);
    let currentMoonDays = currentMoonFraction * lunarConstant;
    return currentMoonDays;

  }
}
