import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CityInfo } from './interFace/city.InterFace';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(public http: HttpClient) { }

  location: CityInfo[] = [];
  cityLocationInfo: BehaviorSubject<CityInfo[]> = new BehaviorSubject<CityInfo[]>(this.location);


  getLocation(location: string): Observable<any> {
    this.location = [];
    return this.http.get<CityInfo[]>(environment.locationURL + location).pipe(
      map((response) => response.map(result => {
        const cityInfo: CityInfo = {
          LocalizedName: result.LocalizedName,
          Key: result.Key,
          Country: result.Country
        };
        this.location.push(cityInfo);
        console.log(this.location);
        return cityInfo;
      },this.cityLocationInfo.next(this.location))
      ));
    }
}
