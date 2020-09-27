import { Component, OnInit } from '@angular/core';
import { PastWeatherService } from '../services/past-weather.service';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { StationReturn } from '../models/station';

@Component({
  selector: 'app-past-weather',
  templateUrl: './past-weather.component.html',
  styleUrls: ['./past-weather.component.css']
})
export class PastWeatherComponent implements OnInit {
  cityList: any = {} as any;
  searchForm: FormGroup;
  historyForm: FormGroup;
  searching = false;
  foundStation = false;
  submitted = false;
  loading = false;
  stations = [];
  hourlyDaily: FormControl;

  constructor(private pastWeatherService: PastWeatherService, private formBuilder: FormBuilder) {

   }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['', Validators.required]
    });

    this.historyForm = this.formBuilder.group({
      hourlyDaily:  ['', Validators.required],
      selectedStation:  ['', Validators.required],
      startDate:  ['', Validators.required],
      endDate:  ['', Validators.required],
    });
  }
  get searchFields() {
    return this.searchForm.controls;
  }
  get historyFields() {
    return this.historyForm.controls;
  }
  async searchForCity(){
    this.foundStation = false;
    this.stations = [];
    this.searching = true;
    if (this.searchForm.invalid || this.searchFields.searchTerm.value === '' ) {
      console.log('Did not Find Any Staions');
      this.searching = false;
      this.loading = false;
      return;
    }
    this.loading = true;
    let stationObj = <StationReturn>await (await this.pastWeatherService.searchForStation(this.searchFields.searchTerm.value));
    if (stationObj.data === null) {
      console.log('Did not Find Any Staions');
      this.searching = false;
      this.loading = false;
      return;
    };
    console.log(stationObj.data[0]);
    let stationIndex = stationObj[0];
    for( let i = 0; i < stationObj.data.length ; i++){
      this.stations[i] = stationObj.data[i];
    }
    console.log(this.stations);
    this.searching = false;
    this.loading = false;
    this.foundStation = true;
  }

  async getHistory(){

    console.log(this.historyFields.endDate.value);
    console.log(this.historyFields.startDate.value);
    console.log(this.historyFields.hourlyDaily.value);
    console.log(this.historyFields.selectedStation.value);
  }
}
