import { Component, OnInit, Input } from '@angular/core';
import { WeatherInfo } from 'src/app/Models/weatherInfo.InterFace';

@Component({
  selector: 'app-day-panel-component',
  templateUrl: './day-panel-component.component.html',
  styleUrls: ['./day-panel-component.component.scss']
})
export class DayPanelComponentComponent implements OnInit {

  constructor() { }
  @Input() weatherData$: WeatherInfo[];

  ngOnInit() {

  }
}
