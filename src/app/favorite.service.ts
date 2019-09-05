import { Injectable } from '@angular/core';
import { CityInfo } from './interFace/city.InterFace';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _favoritList: BehaviorSubject<CityInfo[]> = new BehaviorSubject<CityInfo[]>([]);
  // public favoritList: Observable<CityInfo[]> = this._favoritList.asObservable();
  // favoritList: Subject<CityInfo[]> = new Subject<CityInfo[]>();
  constructor() { }

  // addFavorite(city: CityInfo): Observable<any>{
  //   debugger
  //   return (this._favoritList.next(this._favoritList.push(city)));
  // }
}