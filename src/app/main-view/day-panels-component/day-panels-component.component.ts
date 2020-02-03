import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherInfo } from 'src/app/Models/weatherInfo.InterFace';
import { Subscription } from 'rxjs';
import { CityInfo } from 'src/app/Models/city.InterFace';
import { Store } from '@ngrx/store';
import { FavoriteAdd, FavoriteRemove } from 'src/app/actions';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-day-panels-component',
  templateUrl: './day-panels-component.component.html',
  styleUrls: ['./day-panels-component.component.scss']
})
export class DayPanelsComponentComponent implements OnInit {
  // Heart = faHeart;
  constructor(private store: Store<AppState>) { }

  weatherSub: Subscription;
  weatherData: WeatherInfo[];
  currentCity: CityInfo;
  City: Subscription;
  favorite: Subscription;
  favoriteList: CityInfo[] = [];
  test: Subscription;

  ngOnInit() {
    this.City = this.store.select('citySelect', 'selectCity').subscribe(res => {
      this.currentCity = res;
    });

    this.favorite = this.store.select('favorite', 'favorites').subscribe(res => {
      this.favoriteList = res;
      console.log('here', this.favoriteList);
    });

    this.weatherSub = this.store.select('selectCity', 'weatherInfo').subscribe(res => {
      this.weatherData = res;
    });
  }

  onAddFavorite() {
    if (this.favoriteList.find(city => city.Key === this.currentCity.Key)) {
      this.store.dispatch(new FavoriteRemove(this.currentCity));
    } else {
      this.store.dispatch(new FavoriteAdd(this.currentCity));
    }
  }

}
