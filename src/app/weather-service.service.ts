import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherInfo } from './interFace/weatherInfo.InterFace';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { CityInfo } from './interFace/city.InterFace';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  weather: WeatherInfo[] = [];
  weatherData: BehaviorSubject<WeatherInfo[]> = new BehaviorSubject<WeatherInfo[]>(this.weather);
  daysName: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  locationInfo: CityInfo;
  baseURL: string = environment.baseURL;
  tokenID: string = environment.tokenId
  private _weatherInfo: BehaviorSubject<WeatherInfo[]> = new BehaviorSubject<WeatherInfo[]>([]);
  public weatherInfo: Observable<WeatherInfo[]> = this._weatherInfo.asObservable();
  constructor(private http: HttpClient) { }


  getWeatherInfo(key: string): Observable<any> {

    return this.http.get<WeatherInfo[]>(`${this.baseURL}/forecasts/v1/daily/5day/${key}?apikey=${this.tokenID}&metric=true`)
      .pipe(map((response) => response['DailyForecasts'].map((result => ({
       
          Date: this.daysName[new Date(result.Date).getDay()],
          TemperatureType: result.Temperature.Maximum.Unit,
          MaxTemperatureValue: result.Temperature.Maximum.Value,
          MinTemperatureValue: result.Temperature.Minimum.Value,
          Day: result.Day
        })
        ))
      ), tap(items => this._weatherInfo.next(items))
      )}
} 