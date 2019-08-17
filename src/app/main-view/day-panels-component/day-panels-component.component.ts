import { Component, OnInit, Input, NgModule } from '@angular/core';
import { WeatherInfo } from 'src/app/interFace/weatherInfo.InterFace';
import { WeatherServiceService } from 'src/app/weather-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-day-panels-component',
  templateUrl: './day-panels-component.component.html',
  styleUrls: ['./day-panels-component.component.css']
})
export class DayPanelsComponentComponent implements OnInit {

  constructor(public WeatherService: WeatherServiceService) { }
  getWeatherData: Subscription;
  weatherData: WeatherInfo[];
    
  
ngOnInit() {
  this.getWeatherData = this.WeatherService.weatherData.subscribe((result) => {
    this.weatherData = result;
    console.log(this.weatherData);
  })
  }

} 

