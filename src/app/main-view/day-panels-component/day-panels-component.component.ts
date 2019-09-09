import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherInfo } from 'src/app/Models/weatherInfo.InterFace';
import { Subscription } from 'rxjs';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { faHeart}  from '@fortawesome/free-regular-svg-icons';
import { CityInfo } from 'src/app/Models/city.InterFace';

@Component({
  selector: 'app-day-panels-component',
  templateUrl: './day-panels-component.component.html',
  styleUrls: ['./day-panels-component.component.scss']
})
export class DayPanelsComponentComponent implements OnInit {
  // Heart = faHeart;
  constructor() { }
  @Output() favorite: EventEmitter<CityInfo> = new EventEmitter<CityInfo>();
  @Input() weatherData$: WeatherInfo[];
  @Input() currentCity: CityInfo;

  test: Subscription;

ngOnInit() {

}

  onAddFavorite() {
    this.favorite.emit(this.currentCity);
    }

}

