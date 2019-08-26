import { Injectable } from '@angular/core';
import { CityInfo } from './interFace/city.InterFace';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoriteList: CityInfo[] = [];
  constructor() { }
}

