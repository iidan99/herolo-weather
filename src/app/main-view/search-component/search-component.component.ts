import { EventEmitter, Component, OnInit, Output, Input } from '@angular/core';
import { SearchServiceService } from 'src/app/services/search-service.service';
import {  BehaviorSubject, Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, filter, tap } from 'rxjs/operators';
import { CityInfo } from 'src/app/Models/city.InterFace';
import { Search, CitySelect } from '../../actions/index';
import { Store } from '@ngrx/store';
import { ProductsState } from './../../reducers/index';



@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {
   inputVal: BehaviorSubject<string> = new BehaviorSubject('');
   inputText: string;
   locationData$: Observable<CityInfo[]> = this.store.select('search', 'cities');
   dispose$: Subject<void> = new Subject();
   searchValid = false;
   @Output() dataIsTrue: EventEmitter<boolean> = new EventEmitter<boolean>(false);
   @Output() keyVal: EventEmitter<CityInfo> = new EventEmitter<CityInfo>();
   @Input() favoriteList: CityInfo[];
   city: CityInfo;
   weatherInfo: Subject<CityInfo> = new Subject<CityInfo>();

   constructor(private searchService: SearchServiceService, private store: Store<ProductsState>) {
    this.store.select('citySelect', 'selectCity').subscribe( result => {
      this.city = result;
      this.weatherInfo.next(this.city);
     }
    );
  }

  ngOnInit() {
    this.inputVal
    .pipe(
      takeUntil(this.dispose$),
      debounceTime(300),
      filter(searchTerm => searchTerm.length >= 2),
      tap(searchTerm => this.store.dispatch(new Search(searchTerm)))
      ).subscribe();

    this.weatherInfo.pipe(
        debounceTime(300),
        filter(searchTerm => searchTerm.Key.length >= 2),
        tap(searchTerm => this.store.dispatch(new CitySelect(searchTerm)))
      ).subscribe();
    }

    updateSubjectValue(val: string): void {
    this.searchService.favoriteList = this.favoriteList;
    this.inputVal.next(val);
    this.searchValid = true;
 }

 onSelectCity(element: CityInfo) {
  this.store.dispatch(new CitySelect(element));
  this.searchValid = false;
  this.inputText = '';
 }

 // tslint:disable-next-line: use-life-cycle-interface
 ngOnDestroy() {
  this.inputVal.complete();
  this.dispose$.next();
  this.dispose$.complete();
}

}
