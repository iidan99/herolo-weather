import {  Search, SearchSuccess, SearchFail } from './search-list.actions';
import { CitySelect, CitySuccess, CityFail } from './city-select.action';
import { Favorite, FavoriteAdd, FavoriteFail } from './favorite.action';
import { Temperature  } from './temperature.action';


export const Actions: any[] = [Search, SearchSuccess, SearchFail, CitySelect, CitySuccess, CityFail,
     Favorite, FavoriteAdd, FavoriteFail, Temperature];

export * from './search-list.actions';
export * from './city-select.action';
export * from './favorite.action';
export * from './temperature.action';
