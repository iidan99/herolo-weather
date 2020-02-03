import { EventEmitter, Component, OnInit, Output, Input } from '@angular/core';
import { SearchServiceService } from 'src/app/services/search-service.service';
import { BehaviorSubject, Subject, Observable, Subscription } from 'rxjs';
import { takeUntil, debounceTime, filter, tap } from 'rxjs/operators';
import { CityInfo } from 'src/app/Models/city.InterFace';
import { Search, CitySelect } from '../../actions/index';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';



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
  city: CityInfo;
  weatherInfo: Subject<CityInfo> = new Subject<CityInfo>();
  temp: Subscription;
  tempVal: boolean;

  constructor(private searchService: SearchServiceService, private store: Store<AppState>) {
    this.store.select('citySelect', 'selectCity').subscribe(result => {
      this.city = result;
    }
    );
  }

  ngOnInit() {
    this.temp = this.store.select('val').subscribe(res => this.tempVal = res);

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
      tap(searchTerm => this.store.dispatch(new CitySelect(searchTerm, this.tempVal)))
    ).subscribe();
  }

  updateSubjectValue(val: string): void {
    this.inputVal.next(val);
    this.searchValid = true;
  }

  onSelectCity(element: CityInfo) {
    this.weatherInfo.next(element);
    this.searchValid = false;
    this.inputText = '';
  }

  ngOnDestroy() {
    this.inputVal.complete();
    this.dispose$.next();
    this.dispose$.complete();
  }

}
