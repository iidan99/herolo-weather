import { EventEmitter,Component, OnInit, NgModule } from '@angular/core';
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
  inputText: string;
  weatherInfoData: Subscription;
  weatherInfo: WeatherInfo[];
  locationData: CityInfo[];
  dispose$: Subject<void> = new Subject();
  inputVal: BehaviorSubject<string> = new BehaviorSubject('');
  keyVlue: BehaviorSubject<string> = new BehaviorSubject('');
  location: Subscription;
  correntLocation: string;
  searchvalid: boolean = false;

  ngOnInit() {
    this.location = this.searchService.cityLocationInfo.subscribe((result) => {
      this.locationData = result;
    });

    this.weatherInfoData = this.weatherService.weatherData.subscribe((result) => {
      this.weatherInfo = result;
      this.weatherService.locationInfo = this.correntLocation;
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
 
  }


  updateSubjectValue(val: string): void {
    this.inputVal.next(val);
    this.searchvalid = true;
 }

 onSelectCity(element) {
   this.keyVlue.next(element.Key); 
   this.correntLocation = `${element.LocalizedName} ${element.Country.LocalizedName}`;
   this.searchvalid = false;
   this.inputText = `${element.LocalizedName} ${element.Country.LocalizedName}`;
 }

 ngOnDestroy() {
  this.dispose$.next();
  this.dispose$.complete();
}

}
