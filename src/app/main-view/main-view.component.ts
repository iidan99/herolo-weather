import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherInfo } from '../interFace/weatherInfo.InterFace';
import { CityInfo } from '../interFace/city.InterFace';
import { FavoriteService } from '../favorite.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  weatherData: WeatherInfo[];
  citySelectVal: boolean;
  favorite = false;
  favoriteSelect: CityInfo;
  favoriteList: Subscription;

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {
  }

  getWeatherData(element){
    this.weatherData = element;
    console.log(element);
  }
  citySelect(value: boolean){
    this.citySelectVal = value;
  }
  switchView(value: boolean){
    this.favorite = value;
  }
  favoriteSelected(element: CityInfo){
    console.log(element);
    // this.favoriteService.addFavorite(element);
  }
}
