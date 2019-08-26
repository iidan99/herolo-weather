import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherInfo } from '../interFace/weatherInfo.InterFace';
import { CityInfo } from '../interFace/city.InterFace';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  weatherData: WeatherInfo[];
  citySelectVal: boolean;
  favorite: boolean = false;
  favoriteSelect: CityInfo;
  constructor() { }

  ngOnInit() {
  }

  getweatherData(element){
    this.weatherData = element;
    console.log(element);
  }
  citySelect(value: boolean){
    this.citySelectVal = value;
  }
  switchView(value: boolean){
    this.favorite = value;
  }
  favoritSelected(element: CityInfo){
    this.favoriteSelect = element;
    this.favorite = false;
  }
}
