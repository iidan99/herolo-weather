import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CityInfo } from '../Models/city.InterFace';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  // tslint:disable-next-line: variable-name
  private _cityLocationInfo: BehaviorSubject<CityInfo[]> = new BehaviorSubject<CityInfo[]>([]);
  public cityLocationInfo: Observable<CityInfo[]> = this._cityLocationInfo.asObservable();
  url = '/locations/v1/cities/autocomplete?apikey=';
  favoriteList: CityInfo[] = [];
  constructor(public http: HttpClient) { }



  getLocation(location: string): Observable<CityInfo[]> {
     return this.http.get<CityInfo[]>(`${environment.baseURL}${this.url}${environment.tokenId}&q=${location}`).pipe(
      map((response) => response.map(result => ({
          LocalizedName: result.LocalizedName,
          Key: result.Key,
          Country: result.Country,
          Favorite: ((this.favoriteList.find(city => city.Key === result.Key) === undefined) ? false : true)
        })
        )
      ),
      tap(items => this._cityLocationInfo.next(items))
      );
    }
}
