import { EventEmitter,Component, OnInit, NgModule, Output, Input } from '@angular/core';
import { SearchServiceService } from 'src/app/search-service.service';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, debounceTime, switchMap, filter } from 'rxjs/operators';
import { CityInfo } from 'src/app/interFace/city.InterFace';
import { WeatherServiceService } from 'src/app/weather-service.service';
import { WeatherInfo } from 'src/app/interFace/weatherInfo.InterFace';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  constructor(private searchService: SearchServiceService, private weatherService: WeatherServiceService) {
  
   }
  @Output() dataIsTrue: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  inputVal: BehaviorSubject<string> = new BehaviorSubject('');
  keyVlue: BehaviorSubject<string> = new BehaviorSubject('');
  weatherInfoData: Subscription;
  location: Subscription;
  inputText: string;
  weatherInfo: WeatherInfo[];
  locationData: CityInfo[];
  dispose$: Subject<void> = new Subject();
  correntLocation: string;
  locationCity: CityInfo;
  searchvalid = false;
  @Input() getValue: CityInfo;

  ngOnInit() {
    this.location = this.searchService.cityLocationInfo.subscribe((result) => {
      this.locationData = result;
    });

    this.weatherInfoData = this.weatherService.weatherData.subscribe((result) => {
      if(this.locationCity !== undefined){
        this.weatherInfo = result;
        this.weatherService.locationInfo = this.locationCity;
        this.dataIsTrue.emit(true);
      }
    });
    this.inputVal
    .pipe(
      takeUntil(this.dispose$),
      debounceTime(300),
      filter(searchTerm => searchTerm.length >= 2),
      switchMap(searchTerm => this.searchService.getLocation(searchTerm))
      )
      .subscribe();

    this.keyVlue
      .pipe(
        takeUntil(this.dispose$),
        debounceTime(300),
        filter(searchTerm => searchTerm.length >= 2),
        switchMap(Key => this.weatherService.getWeatherInfo(Key))
        )
        .subscribe();

    if (this.getValue !== undefined && this.locationCity.Key !== this.getValue.Key) {
        this.onSelectCity(this.getValue);
        }
      }


      updateSubjectValue(val: string): void {
    this.inputVal.next(val);
    this.searchvalid = true;
 }

 onSelectCity(element) {
  this.locationCity = element;
  this.keyVlue.next(element.Key);
  this.inputText = `${element.LocalizedName} ${element.Country.LocalizedName}`;
  this.searchvalid = false;
  this.inputText = `${element.LocalizedName} ${element.Country.LocalizedName}`;
 }

 ngOnDestroy() {
  this.dispose$.next();
  this.dispose$.complete();
}

}
