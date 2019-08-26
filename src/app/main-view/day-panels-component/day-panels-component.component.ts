import { Component, OnInit } from '@angular/core';
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
  constructor(public WeatherService: WeatherServiceService, public FavriteService: FavoriteService) { }
  getWeatherData: Subscription;
  weatherData: WeatherInfo[];
  currentCity: CityInfo;
  
  
ngOnInit() {
  this.getWeatherData = this.WeatherService.weatherData.subscribe((result) => {
    this.weatherData = result;
    this.currentCity = this.WeatherService.locationInfo;
    });
  }

  onAddFavorite(){
    if(!this.FavriteService.favoriteList.includes(this.currentCity)){
      this.FavriteService.favoriteList.push(this.currentCity);
      console.log(this.FavriteService.favoriteList);
    }
  }

} 

