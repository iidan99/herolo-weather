import { Action } from '@ngrx/store';

export const FAVORITE      = '[FAVORITE] Favorite';
export const FAVORITE_ADD      = '[FAVORITE] FavoriteAdd';
export const FAVORITE_FAIL      = '[FAVORITE] FavoriteFail';

export class Favorite implements Action {
    readonly type = FAVORITE;

    constructor(public payload: boolean) {}

}

export class FavoriteAdd implements Action {
    readonly type = FAVORITE_ADD;

    constructor(public payload: boolean) {}

}

export class FavoriteFail implements Action {
    readonly type = FAVORITE_FAIL;

    constructor(public payload: boolean) {}

}

export type Actions = Favorite | FavoriteAdd | FavoriteFail;