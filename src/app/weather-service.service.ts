import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherInfo } from './interFace/weatherInfo.InterFace';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CityInfo } from './interFace/city.InterFace';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  weather: WeatherInfo[] = [];
  weatherData: BehaviorSubject<WeatherInfo[]> = new BehaviorSubject<WeatherInfo[]>(this.weather);
  daysName: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  locationInfo: CityInfo;
  constructor(private http: HttpClient) { }


  getWeatherInfo(key: string): Observable<any> {
    this.weather = [];
    return this.http.get<WeatherInfo[]>(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=hqqt9CBN6GZG01X5ecACK5CfQXMp4r9B&metric=true`)
      .pipe(map((response) => response['DailyForecasts'].map((result => {
        const weekInfo: WeatherInfo = {
          Date: this.daysName[new Date(result.Date).getDay()],
          TemperatureType: result.Temperature.Maximum.Unit,
          MaxTemperatureValue: result.Temperature.Maximum.Value,
          MinTemperatureValue: result.Temperature.Minimum.Value,
          Day: result.Day
        };
        this.weather.push(weekInfo);
        
        return weekInfo;
      })
        , this.weatherData.next(this.weather))
      ));
  }
} 