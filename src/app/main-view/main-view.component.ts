import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherInfo } from '../interFace/weatherInfo.InterFace';
import { CityInfo } from '../interFace/city.InterFace';
import { FavoriteService } from '../favorite.service';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
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
  favoriteList: Subscription;
  weatherInfo: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private favoriteService: FavoriteService, private weatherService: WeatherServiceService) { }

  ngOnInit() {
    this.weatherInfo.pipe(
    debounceTime(300),
    filter(searchTerm => searchTerm.length >= 2),
    switchMap(searchTerm => this.weatherService.getWeatherInfo(searchTerm))
    ).subscribe()
  }

  
  keySelect(key: string){
    this.weatherInfo.next(key);
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
    // this.favoriteService.addFavorite(element);
  }
}
