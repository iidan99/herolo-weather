import { Action } from '@ngrx/store';

export const TEMPERATURE    = '[TEMPERATURE] Temperature';


export class Temperature implements Action {
    readonly type = TEMPERATURE;

    constructor(public payload: boolean) {}

}

export type tempActions = Temperature;
