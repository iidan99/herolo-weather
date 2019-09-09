import { Component, OnInit } from '@angular/core';
import { WeatherInfo } from '../Models/weatherInfo.InterFace';
import { CityInfo } from '../Models/city.InterFace';
import { Observable, Subject } from 'rxjs';
import { WeatherServiceService } from '../services/weather-service.service';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  weatherData$: Observable<WeatherInfo[]> = this.weatherService.weatherInfo;
  citySelectVal: boolean;
  favorite = false;
  favoriteSelect: CityInfo;
  favoriteList: CityInfo[] = [];
  city: CityInfo;
  weatherInfo: Subject<CityInfo> = new Subject<CityInfo>();

  constructor(private weatherService: WeatherServiceService) { }

  ngOnInit() {
    this.weatherInfo.pipe(
      debounceTime(300),
      filter(searchTerm => searchTerm.Key.length >= 2),
      switchMap(searchTerm => this.weatherService.getWeatherInfo(searchTerm.Key))
    ).subscribe()
  }


  keySelect(city: CityInfo) {
    this.weatherInfo.next(city);
    this.city = city;
    this.citySelectVal = true;
  }
  citySelect(value: boolean) {
    this.citySelectVal = value;
  }
  switchView(value: boolean) {
    this.favorite = value;
  }
  favoriteSelected(element: CityInfo) {
  }


  addFavorite(element: CityInfo) {
    if (this.favoriteList.find(city => city.Key === element.Key)) {
      this.favoriteList = this.favoriteList.filter(city => city !== element);
      this.city.Favorite = false;
    } else {
      this.favoriteList.push(element);
      this.city.Favorite = true;
    }
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.weatherInfo.next();
    this.weatherInfo.complete();
  }
}
