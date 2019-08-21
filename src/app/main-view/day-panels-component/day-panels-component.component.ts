import { Component, OnInit, Input, NgModule } from '@angular/core';
import { WeatherInfo } from 'src/app/interFace/weatherInfo.InterFace';
import { WeatherServiceService } from 'src/app/weather-service.service';
import { Subscription } from 'rxjs';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-day-panels-component',
  templateUrl: './day-panels-component.component.html',
  styleUrls: ['./day-panels-component.component.css']
})
export class DayPanelsComponentComponent implements OnInit {
  Heart = faHeart;
  constructor(public WeatherService: WeatherServiceService) { }
  getWeatherData: Subscription;
  weatherData: WeatherInfo[];
  currentCity: string;
    
  
ngOnInit() {
  this.getWeatherData = this.WeatherService.weatherData.subscribe((result) => {
    this.weatherData = result;
    this.currentCity = this.WeatherService.locationInfo;
    console.log(this.weatherData);
  })
  }

} 

