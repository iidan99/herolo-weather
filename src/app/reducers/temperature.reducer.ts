import { Action } from '@ngrx/store';
import { CityInfo } from '../Models/city.InterFace';
import * as Temperature from '../actions/temperature.action';

export interface TemperatureState {
  temperature: boolean;
}

export const initialState: TemperatureState = {
    temperature: true
};

export function reducer(state: TemperatureState = initialState, action: Temperature.Actions ) {
  switch(action.type) {
    case Temperature.TEMPERATURE:
      return {
        ...state,
        temperature: action.payload
      };
    default:
      return state;
  }
}
