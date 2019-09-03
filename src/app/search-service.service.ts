import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CityInfo } from './interFace/city.InterFace';
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
  constructor(public http: HttpClient) { }



  getLocation(location: string): Observable<any> {
    return this.http.get<CityInfo[]>(`${environment.baseURL}${this.url}${environment.tokenId}=${location}`).pipe(
      map((response) => response.map(result => ({
          LocalizedName: result.LocalizedName,
          Key: result.Key,
          Country: result.Country
        })
        )
      ),
      tap(items => this._cityLocationInfo.next(items))
      );
    }
}
