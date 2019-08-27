import { Injectable } from '@angular/core';
import { CityInfo } from './interFace/city.InterFace';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoriteList: CityInfo[] = [];
  addToFavorite: Subject<CityInfo> = new Subject<CityInfo>();

  constructor() { }

  addFavorite(city: CityInfo): Observable<CityInfo[]> {

    this.favoriteList.map(result => {
      if(result.Key === city.Key){
        console.log(true);
      } else {
        console.log(false);
      }
      });
    // if (this.favoriteList.includes(city)) {
    //   this.favoriteList.push(city);
    // }
    return;
  }
}


