import { Component, OnInit, Input } from '@angular/core';
import { WeatherInfo } from 'src/app/Models/weatherInfo.InterFace';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-day-panel-component',
  templateUrl: './day-panel-component.component.html',
  styleUrls: ['./day-panel-component.component.scss']
})
export class DayPanelComponentComponent implements OnInit {

  constructor(private store: Store<AppState>) { }
  weatherData: WeatherInfo[];
  getWeatherInfo: Subscription;


  ngOnInit() {
 this.getWeatherInfo = this.store.select('citySelect', 'weatherInfo').subscribe(res =>
  this.weatherData = res
   );
  }
}
