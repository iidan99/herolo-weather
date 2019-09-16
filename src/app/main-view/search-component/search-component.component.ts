import { EventEmitter, Component, OnInit, Output, Input } from '@angular/core';
import { SearchServiceService } from 'src/app/services/search-service.service';
import {  BehaviorSubject, Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, switchMap, filter } from 'rxjs/operators';
import { CityInfo } from 'src/app/Models/city.InterFace';
import { WeatherServiceService } from 'src/app/services/weather-service.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {

  constructor(private searchService: SearchServiceService, private weatherService: WeatherServiceService) {

   }
   inputVal: BehaviorSubject<string> = new BehaviorSubject('');
   inputText: string;
   locationData$: Observable<CityInfo[]> = this.searchService.cityLocationInfo;
   dispose$: Subject<void> = new Subject();
   searchValid = false;
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
    this.searchValid = true;
 }

 onSelectCity(element: CityInfo) {
   this.keyVal.emit(element);
   this.searchValid = false;
   this.inputText = '';
 }

 // tslint:disable-next-line: use-life-cycle-interface
 ngOnDestroy() {
  this.dispose$.next();
  this.dispose$.complete();
}

}
