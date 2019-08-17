import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherInfo } from '../interFace/weatherInfo.InterFace';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  weatherData: WeatherInfo[];
  constructor() { }

  ngOnInit() {
  }

  getweatherData(element){
    this.weatherData = element;
    console.log(element);
  }
}
