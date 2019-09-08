import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherInfo } from 'src/app/interFace/weatherInfo.InterFace';
import { Subscription } from 'rxjs';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CityInfo } from 'src/app/interFace/city.InterFace';

@Component({
  selector: 'app-day-panels-component',
  templateUrl: './day-panels-component.component.html',
  styleUrls: ['./day-panels-component.component.css']
})
export class DayPanelsComponentComponent implements OnInit {
  Heart = faHeart;
  constructor() { }
  @Output() favorit: EventEmitter<CityInfo> = new EventEmitter<CityInfo>();
  @Input() weatherData$: WeatherInfo[];
  @Input() currentCity: CityInfo;

  test: Subscription;

ngOnInit() {

}

  onAddFavorite() {
    this.favorit.emit(this.currentCity);
  }

}

