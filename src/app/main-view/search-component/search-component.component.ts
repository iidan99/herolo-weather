import { EventEmitter,Component, OnInit, Output, Input } from '@angular/core';
import { SearchServiceService } from 'src/app/search-service.service';
import { Subscription, BehaviorSubject, Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, switchMap, filter } from 'rxjs/operators';
import { CityInfo } from 'src/app/interFace/city.InterFace';
import { WeatherServiceService } from 'src/app/weather-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  constructor(private searchService: SearchServiceService, private weatherService: WeatherServiceService) {

   }
   inputVal: BehaviorSubject<string> = new BehaviorSubject('');
   weatherInfoData: Subscription;
   location: Subscription;
   inputText: string;
   locationData$: Observable<CityInfo[]> = this.searchService.cityLocationInfo;
   dispose$: Subject<void> = new Subject();  searchvalid = false;
   searchInput: FormControl;
   @Output() dataIsTrue: EventEmitter<boolean> = new EventEmitter<boolean>(false);
   @Output() keyVal: EventEmitter<CityInfo> = new EventEmitter<CityInfo>();
   @Input() favoriteList: CityInfo[];


  ngOnInit() {

    this.inputVal
    .pipe(
      takeUntil(this.dispose$),
      debounceTime(300),
      filter(searchTerm => searchTerm.length >= 2),
      switchMap(searchTerm => this.searchService.getLocation(searchTerm))
      )
      .subscribe();
     }


 updateSubjectValue(val: string): void {
    this.searchService.favoriteList = this.favoriteList;
    this.inputVal.next(val);
    this.searchvalid = true;
 }

 onSelectCity(element: CityInfo) {
   this.keyVal.emit(element);
  this.searchvalid = false;
 }

 ngOnDestroy() {
  this.dispose$.next();
  this.dispose$.complete();
}

}
