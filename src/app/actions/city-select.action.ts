import { Action } from '@ngrx/store';
import { CityInfo } from '../Models/city.InterFace';

export const CITY_SELECT      = '[SELECTION] CitySelect';
export const CITY_SUCCESS       = '[SELECTION] CitySuccess';
export const CITY_FAIL       = '[SELECTION] CityFail';

export class CitySelect implements Action {
    readonly type = CITY_SELECT;

    constructor(public payload: CityInfo) {}

}

export class CitySuccess implements Action {
    readonly type = CITY_SUCCESS;

    constructor(public payload: CityInfo) {}

}

export class CityFail implements Action {
    readonly type = CITY_FAIL;

    constructor(public payload: any) {}

}

export type Actions = CitySelect | CitySuccess | CityFail;
