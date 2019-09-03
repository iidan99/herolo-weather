import { Component, OnInit, Input } from '@angular/core';
import { WeatherInfo } from 'src/app/interFace/weatherInfo.InterFace';

@Component({
  selector: 'app-day-panel-component',
  templateUrl: './day-panel-component.component.html',
  styleUrls: ['./day-panel-component.component.css']
})
export class DayPanelComponentComponent implements OnInit {

  constructor() { }
  @Input() weatherData$: WeatherInfo[];
  daysName: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  today: string;
  
  ngOnInit() {
    this.today = this.daysName[new Date().getDay()];
  }
}
