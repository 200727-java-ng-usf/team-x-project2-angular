import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moon-phase',
  templateUrl: './moon-phase.component.html',
  styleUrls: ['./moon-phase.component.css']
})
export class MoonPhaseComponent implements OnInit {

  chosenDate = new Date();
  moonPhase = [];
  suncalc = require('suncalc');
  constructor() { }

  ngOnInit(): void {

    for (let i = 0; i < 5; i++){
      this.moonPhase[i] = this.suncalc.getMoonIllumination(new Date());
      console.log(this.moonPhase[i]);
    }

  }

  calculateMoonPhase(date: Date){




  }

}
