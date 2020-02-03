import { Component, OnInit } from '@angular/core';
import { WeatherInfo } from '../Models/weatherInfo.InterFace';
import { CityInfo } from '../Models/city.InterFace';
import { Observable, Subject, Subscription } from 'rxjs';
import { WeatherServiceService } from '../services/weather-service.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  weatherData$: Observable<WeatherInfo[]> = this.weatherService.weatherInfo;
  favorite = false;
  favoriteSelect: CityInfo;
  favoriteList: CityInfo[] = [];
  city: Subscription;
  citySelect: CityInfo = null;
  temperatureVal: Subscription;
  weatherInfo: Subject<CityInfo> = new Subject<CityInfo>();

  constructor(private weatherService: WeatherServiceService, private store: Store<AppState>) { }

  ngOnInit() {
    this.city = this.store.select('citySelect', 'selectCity').subscribe(res =>
    {
      this.citySelect = res;
      console.log(this.citySelect);
    }
      );
  }

  switchView(value: boolean) {
    this.favorite = value;
  }
  favoriteSelected(element: CityInfo) {
    this.weatherInfo.next(element);
    this.favorite = false;
  }


  addFavorite(element: CityInfo) {
    if (this.favoriteList.find(city => city.Key === element.Key)) {
      this.favoriteList = this.favoriteList.filter(city => city !== element);
    } else {
      this.favoriteList.push(element);
    }
  }

  ngOnDestroy() {
    this.weatherInfo.next();
    this.weatherInfo.complete();
  }
}
