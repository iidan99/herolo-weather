import { Component, OnInit } from '@angular/core';
import { WeatherInfo } from '../interFace/weatherInfo.InterFace';
import { CityInfo } from '../interFace/city.InterFace';
import { FavoriteService } from '../favorite.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { WeatherServiceService } from '../weather-service.service';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  weatherData$: Observable<WeatherInfo[]> = this.weatherService.weatherInfo;
  citySelectVal: boolean;
  favorite = false;
  favoriteSelect: CityInfo;
  favoriteList: CityInfo[];
  city: CityInfo;
  weatherInfo: Subject<CityInfo> = new Subject<CityInfo>();

  constructor(private favoriteService: FavoriteService, private weatherService: WeatherServiceService) { }

  ngOnInit() {
    this.weatherInfo.pipe(
    debounceTime(300),
    filter(searchTerm => searchTerm.Key.length >= 2),
    switchMap(searchTerm => this.weatherService.getWeatherInfo(searchTerm.Key))
    ).subscribe()
  }

  
  keySelect(city: CityInfo){
    this.weatherInfo.next(city);
    this.city = city;
    this.citySelectVal = true;
  }
  citySelect(value: boolean){
    this.citySelectVal = value;
  }
  switchView(value: boolean){
    this.favorite = value;
  }
  favoriteSelected(element: CityInfo){
    console.log(element);
  }  

  ngOnDestroy(){
    this.weatherInfo.next();
    this.weatherInfo.complete();
  }

  addFavorit(element: CityInfo){
    this.favoriteService.addFavorite(element);
  }
}
