import { Component, OnInit } from '@angular/core';
import { PastWeatherService } from '../services/past-weather.service';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { StationReturn } from '../models/station';
import { HourlyHistDataPoint } from '../models/hourly-past';
import { DailyHistDataPoint } from '../models/daily-past';
import { ChartOptions, ChartDataSets, Chart } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
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
  gotHistoryData = false;
  stations = [];
  hourlyDaily: FormControl;

  tempChart: Chart;
  humidityChart: Chart;
  rainChart: Chart;
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
    if(this.gotHistoryData){
      this.tempChart.destroy();
      this.humidityChart.destroy();
      this.rainChart.destroy();
    }
    if(this.historyFields.hourlyDaily.value == 'hourly'){
      this.fillHourlyHistoryCharts();
    }
    if(this.historyFields.hourlyDaily.value == 'daily'){
      this.fillDailyHistoryCharts();
    }


  }
  async fillDailyHistoryCharts(){
    if(this.historyFields.endDate.value < this.historyFields.startDate.value){
      return;
    }
    console.log(this.historyFields.endDate.value);
    console.log(this.historyFields.startDate.value);
    console.log(this.historyFields.hourlyDaily.value);
    console.log(this.historyFields.selectedStation.value);
    let historySet = <DailyHistDataPoint> await this.pastWeatherService
      .getHistory(
        this.historyFields.hourlyDaily.value,
        this.historyFields.selectedStation.value,
        this.historyFields.startDate.value,
        this.historyFields.endDate.value,
      );
    if (historySet){
      this.gotHistoryData = true;
      let tempLabels: Label[] = [];
      let tempData = [];
      for(let i = 0; i < historySet.data.length; i++ ){
        tempLabels[i] = historySet.data[i].date;
        tempData[i] = historySet.data[i].tavg;
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
            label: 'temperature',
            data: tempData,
            backgroundColor: 'rgba(21, 255, 255, 0.5)',
            borderColor: 'black',
            borderWidth: 2
          }]
        }
      });
    }
    console.log(historySet.data);
    }

  async fillHourlyHistoryCharts(){
    if(this.historyFields.endDate.value < this.historyFields.startDate.value){
      return;
    }
    console.log(this.historyFields.endDate.value);
    console.log(this.historyFields.startDate.value);
    console.log(this.historyFields.hourlyDaily.value);
    console.log(this.historyFields.selectedStation.value);
    let historySet = <HourlyHistDataPoint> await this.pastWeatherService
      .getHistory(
        this.historyFields.hourlyDaily.value,
        this.historyFields.selectedStation.value,
        this.historyFields.startDate.value,
        this.historyFields.endDate.value,
      );
    if (historySet){
      this.gotHistoryData = true;
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
            backgroundColor: 'rgba(21, 255, 255, 0.5)',
            borderColor: 'black',
            borderWidth: 2
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
            backgroundColor: 'rgba(21, 255, 255, 0.5)',
            borderColor: 'black',
            borderWidth: 2
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
            backgroundColor: 'rgba(21, 255, 255, 0.5)',
            borderColor: 'black',
            borderWidth: 2
          }]
        }
      });
    }
    console.log(historySet.data);
  }
}
