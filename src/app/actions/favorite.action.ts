import { Action } from '@ngrx/store';
import { CityInfo } from '../Models/city.InterFace';

export const FAVORITE_ADD      = '[FAVORITE] FavoriteAdd';
export const FAVORITE_REMOVE      = '[FAVORITE] FavoriteRemove';
export const FAVORITE_FAIL      = '[FAVORITE] FavoriteFail';



export class FavoriteAdd implements Action {
    readonly type = FAVORITE_ADD;

    constructor(public payload: CityInfo) {}

}

export class FavoriteRemove implements Action {
    readonly type = FAVORITE_REMOVE;

    constructor(public payload: CityInfo) {}

}


export class FavoriteFail implements Action {
    readonly type = FAVORITE_FAIL;

    constructor(public payload: boolean) {}

}

export type Actions =  FavoriteAdd | FavoriteFail | FavoriteRemove;
