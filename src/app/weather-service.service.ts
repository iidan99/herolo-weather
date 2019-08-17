import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherInfo } from './interFace/weatherInfo.InterFace';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  weather: WeatherInfo[] = [];
  weatherData: BehaviorSubject<WeatherInfo[]> = new BehaviorSubject<WeatherInfo[]>(this.weather);
  daysName: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  locationInfo: string;
  constructor(private http: HttpClient) { }


  getWeatherInfo(key: string): Observable<any> {
    this.weather = [];
    return this.http.get<WeatherInfo[]>(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=hqqt9CBN6GZG01X5ecACK5CfQXMp4r9B&metric=true`)
    .pipe(map((response) => response['DailyForecasts'].map((test => {
          const weekInfo: WeatherInfo = {
            Date: this.daysName[new Date(test.Date).getDay()],
            TemperatureType: test.Temperature.Maximum.Unit,
            MaxTemperatureValue: test.Temperature.Maximum.Value,
            MinTemperatureValue: test.Temperature.Minimum.Value,
            Day: test.Day
           };
          this.weather.push(weekInfo);
          console.log(this.weather);

          return weekInfo;
        })
      ,this.weatherData.next(this.weather))
      ));
  }
} 