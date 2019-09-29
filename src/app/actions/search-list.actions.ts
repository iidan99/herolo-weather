import { Action } from '@ngrx/store';
import { CityInfo } from '../Models/city.InterFace';

export const SEARCH      = '[CITY] Search';
export const SEARCH_SUCCESS      = '[CITY] Search Success';
export const SEARCH_FAIL      = '[CITY] Search Fail';

export class Search implements Action {
    readonly type = SEARCH;

    constructor(public payload: string) {}

}

export class SearchSuccess implements Action {
    readonly type = SEARCH_SUCCESS;

    constructor(public payload: CityInfo[]) {}

}

export class SearchFail implements Action {
    readonly type = SEARCH_FAIL;

    constructor(public payload: any) {}

}

export type Actions = Search | SearchSuccess | SearchFail;
