import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { WeatherInfo } from '../Models/weatherInfo.InterFace';
import { CityInfo } from '../Models/city.InterFace';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  weather: WeatherInfo[] = [];
  weatherData: BehaviorSubject<WeatherInfo[]> = new BehaviorSubject<WeatherInfo[]>(this.weather);
  daysName: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  locationInfo: CityInfo;
  baseURL: string = environment.baseURL;
  tokenID: string = environment.tokenId;
  today: string = this.daysName[new Date().getDay()];
  temperature: boolean;
  private _weatherInfo: BehaviorSubject<WeatherInfo[]> = new BehaviorSubject<WeatherInfo[]>([]);
  public weatherInfo: Observable<WeatherInfo[]> = this._weatherInfo.asObservable();
  
  constructor(private http: HttpClient,  private store: Store<AppState>) {

   }

  getWeatherInfo(key: string, temp: boolean): Observable<any> {

    return this.http.get<WeatherInfo[]>(`${this.baseURL}/forecasts/v1/daily/5day/${key}?apikey=
    ${this.tokenID}&metric=${temp}`)
      .pipe(map((response) => response['DailyForecasts'].map((result => ({
          Date: (this.daysName[new Date(result.Date).getDay()] === this.today ? 'Today' : this.daysName[new Date(result.Date).getDay()]),
          TemperatureType: result.Temperature.Maximum.Unit,
          MaxTemperatureValue: result.Temperature.Maximum.Value,
          MinTemperatureValue: result.Temperature.Minimum.Value,
          TempUnit: result.Temperature.Minimum.Unit,
          Day: result.Day,
          DayIcon: result.Day.Icon
        })
        ))
      ), tap(items => this._weatherInfo.next(items))
      ); }
}
