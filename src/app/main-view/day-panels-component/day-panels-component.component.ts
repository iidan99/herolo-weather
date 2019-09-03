import { Component, OnInit, Input } from '@angular/core';
import { WeatherInfo } from 'src/app/interFace/weatherInfo.InterFace';
import { WeatherServiceService } from 'src/app/weather-service.service';
import { Subscription } from 'rxjs';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CityInfo } from 'src/app/interFace/city.InterFace';
import { FavoriteService } from 'src/app/favorite.service';

@Component({
  selector: 'app-day-panels-component',
  templateUrl: './day-panels-component.component.html',
  styleUrls: ['./day-panels-component.component.css']
})
export class DayPanelsComponentComponent implements OnInit {
  Heart = faHeart;
  constructor(private favoriteService: FavoriteService) { }
  getWeatherData: Subscription;
  @Input() weatherData$: WeatherInfo[];
  currentCity: CityInfo;
  test: Subscription;

ngOnInit() {
  // this.test = this.favoriteService.addToFavorite.subscribe((result) => {
  //   console.log(result);
  // })
}

  onAddFavorite() {
    this.favoriteService.addToFavorite.next(this.currentCity);
  }

}

