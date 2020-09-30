import { Component, OnInit } from '@angular/core';
import { PastWeatherService } from '../services/past-weather.service';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import { StationReturn } from '../models/historicalStation';
import { HourlyHistDataPoint } from '../models/hourly-past';
import { DailyHistDataPoint } from '../models/daily-past';
import { Chart } from 'chart.js';
import {Label } from 'ng2-charts';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-past-weather',
  templateUrl: './past-weather.component.html',
  styleUrls: ['./past-weather.component.css']
})
export class PastWeatherComponent{
  cityList: any = {} as any;
  // Forms
  searchForm = new FormGroup({
    searchTerm: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  historyForm = new FormGroup({
    hourlyDaily: new FormControl('', Validators.required),
    selectedStation: new FormControl('', Validators.required)
  });
  searching = false;
  gettingHistory = false;
  foundStation = false;
  submitted = false;
  loading = false;
  gotHistoryData = false;
  stations = [];
  dataSetEmpty = false;
  badStation = false;

  // Dates
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  dateValid = false;
  tenOrLessDays = false;
  yearOrLess = false;

  // Charts
  tempChart: Chart;
  humidityChart: Chart;
  rainChart: Chart;

  constructor(private pastWeatherService: PastWeatherService, private formBuilder: FormBuilder, private calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }

  get searchTerm(): any{
    return this.searchForm.get('searchTerm');
  }
  get hourlyDaily(): any{
    return this.historyForm.get('hourlyDaily');
  }
  get selectedStation(): any{
    return this.historyForm.get('selectedStation');
  }
  get searchFields() {
    return this.searchForm.controls;
  }
  get historyFields() {
    return this.historyForm.controls;
  }
  async searchForCity(){
    this.badStation = false;
    this.foundStation = false;
    this.stations = [];
    this.searching = true;
    if (this.searchForm.invalid || this.searchFields.searchTerm.value === '' ) {
      console.log('Did not Find Any Staions');
      this.badStation = true;
      this.searching = false;
      this.loading = false;
      return;
    }
    this.loading = true;
    let stationObj = <StationReturn>await (await this.pastWeatherService.searchForStation(this.searchFields.searchTerm.value));
    if (stationObj.data === null) {
      console.log('Did not Find Any Staions');
      this.badStation = true;
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

    if(this.gotHistoryData){
      this.tempChart.destroy();
      this.humidityChart.destroy();
      this.rainChart.destroy();
    }
    if (this.historyFields.hourlyDaily.value == 'hourly'){
      let date = this.calendar.getNext(this.fromDate, 'd', 10);
      if(this.toDate.after(date)){
        this.dateValid = false;
        return;
      }
      this.dateValid = true;
      this.fillHourlyHistoryCharts();
    }
    if (this.historyFields.hourlyDaily.value == 'daily'){
      let date = this.calendar.getNext(this.fromDate, 'd', 370);
      if(this.toDate.after(date)){
        this.dateValid = false;
        return;
      }
      this.dateValid = true;
      this.fillDailyHistoryCharts();
    }
  }
  async fillDailyHistoryCharts(){
    this.gettingHistory = true;
    // Add a zero if single digit
    let fromDayFixed = this.fromDate.day.toString();
    let fromMonthFixed = this.fromDate.month.toString();
    let toDayFixed = this.toDate.day.toString();
    let toMonthFixed = this.toDate.month.toString();
    if (fromDayFixed.length === 1){
       fromDayFixed = '0' + fromDayFixed;
    }
    if (fromMonthFixed.length === 1){
      fromMonthFixed = '0' + fromMonthFixed;
    }
    if (toDayFixed.length === 1){
      toDayFixed = '0' + toDayFixed;
    }
    if (toMonthFixed.length === 1){
      toMonthFixed = '0' + toMonthFixed;
    }
    let fromDatecompiled = '' + this.fromDate.year + '-' + fromMonthFixed + '-' + fromDayFixed;
    let toDateCompiled = '' + this.fromDate.year + '-' + toMonthFixed + '-' + toDayFixed;
    // Get Data Set
    let historySet = <DailyHistDataPoint> await this.pastWeatherService
      .getHistory( this.historyFields.hourlyDaily.value, this.historyFields.selectedStation.value, fromDatecompiled, toDateCompiled);
    if (historySet.data[0] != null){
      // Assemble charts from data
      this.dataSetEmpty = false;
      this.gotHistoryData = true;
      let tempLabels: Label[] = [];
      let tempData = [];
      let minTempData = [];
      let maxTempData = [];
      let rainData = [];
      for (let i = 0; i < historySet.data.length; i++ ){
        tempLabels[i] = historySet.data[i].date;
        tempData[i] = (Math.round(((historySet.data[i].tavg * 1.8) + 32) * 100) / 100).toFixed(2);
        rainData[i] = historySet.data[i].prcp;
        minTempData[i] = (Math.round(((historySet.data[i].tmin * 1.8) + 32) * 100) / 100).toFixed(2);
        maxTempData[i] = (Math.round(((historySet.data[i].tmax * 1.8) + 32) * 100) / 100).toFixed(2);
      };
      this.gotHistoryData = true;
      this.tempChart = new Chart('tempChart', {
        type: 'line',
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          title: {
            display: true,
            text: 'Average Daily Temperature'
          }
        },
        data: {
          labels: tempLabels,
          datasets: [{
            label: '\xB0 F',
            data: tempData,
            backgroundColor: 'rgba(21, 255, 255, 0.05)',
            borderColor: 'black',
            borderWidth: 1
          }]
        }
      });
      this.rainChart = new Chart('rainChart', {
        type: 'line',
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          title: {
            display: true,
            text: 'Average Daily Precipitation in mm '
          }
        },
        data: {
          labels: tempLabels,
          datasets: [{
            label: 'mm',
            data: rainData,
            backgroundColor: 'rgba(21, 255, 255, 0.05)',
            borderColor: 'black',
            borderWidth: 1
          }]
        }
      });
      // using same chart for simplicity
      this.humidityChart = new Chart('humidityChart', {
        type: 'line',
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          title: {
            display: true,
            text: 'Daily Min and Max Temperatures'
          }
        },
        data: {
          labels: tempLabels,
          datasets: [ {
            label: '\xB0 F Max',
            data: maxTempData,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderColor: 'red',
            borderWidth: 1
          }, {
            label: '\xB0 F Min',
            data: minTempData,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderColor: 'blue',
            borderWidth: 1
          }]
        }
      });
      this.gettingHistory = false;
    } else {
      this.dataSetEmpty = true;
      this.gettingHistory = false;
      return;
    }
  }

  async fillHourlyHistoryCharts(){
    this.gettingHistory = true;
    // Add extra zero if single digit
    let fromDayFixed = this.fromDate.day.toString();
    let fromMonthFixed = this.fromDate.month.toString();
    let toDayFixed = this.toDate.day.toString();
    let toMonthFixed = this.toDate.month.toString();
    if (fromDayFixed.length === 1){
       fromDayFixed = '0' + fromDayFixed;
    }
    if (fromMonthFixed.length === 1){
      fromMonthFixed = '0' + fromMonthFixed;
    }
    if (toDayFixed.length === 1){
      toDayFixed = '0' + toDayFixed;
    }
    if (toMonthFixed.length === 1){
      toMonthFixed = '0' + toMonthFixed;
    }
    let fromDatecompiled = '' + this.fromDate.year + '-' + fromMonthFixed + '-' + fromDayFixed;
    let toDateCompiled = '' + this.fromDate.year + '-' + toMonthFixed + '-' + toDayFixed;
    let historySet = <HourlyHistDataPoint> await this.pastWeatherService
      .getHistory(
        this.historyFields.hourlyDaily.value,
        this.historyFields.selectedStation.value,
        fromDatecompiled,
        toDateCompiled,
      );
    if (historySet.data[0] != null){
      this.dataSetEmpty = false;
      this.gotHistoryData = true;
      // Asemble charts from data
      let tempLabels: Label[] = [];
      let tempData = [];
      let humidityData = [];
      let rainData = [];
      for(let i = 0; i < historySet.data.length; i++ ){
        tempLabels[i] = historySet.data[i].time;
        tempData[i] = historySet.data[i].temp;
        humidityData[i] = historySet.data[i].rhum;
        rainData[i] = historySet.data[i].dwpt;
      };
      this.gotHistoryData = true;
      this.tempChart = new Chart('tempChart', {
        type: 'line',
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          title: {
            display: true,
            text: 'Temperature History by Hour'
          }
        },
        data: {
          labels: tempLabels,
          datasets: [{
            label: 'temperature',
            data: tempData,
            backgroundColor: 'rgba(21, 255, 255, 0.05)',
            borderColor: 'black',
            borderWidth: 1
          }]
        }
      });
      this.humidityChart = new Chart('humidityChart', {
        type: 'line',
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          title: {
            display: true,
            text: 'Dewpoint History by Hour'
          }
        },
        data: {
          labels: tempLabels,
          datasets: [{
            label: 'Humidity %',
            data: humidityData,
            backgroundColor: 'rgba(21, 255, 255, 0.05)',
            borderColor: 'black',
            borderWidth: 1
          }]
        }
      });
      this.rainChart = new Chart('rainChart', {
        type: 'line',
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          title: {
            display: true,
            text: 'Percipitaion History by Hour'
          }
        },
        data: {
          labels: tempLabels,
          datasets: [{
            label: 'percipitaion',
            data: rainData,
            backgroundColor: 'rgba(21, 255, 255, 0.05)',
            borderColor: 'black',
            borderWidth: 1
          }]
        }
      });
      this.gettingHistory = false;
    }
    else{
      this.gettingHistory = false;
      this.dataSetEmpty = true;
      return;
    }

  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
}
