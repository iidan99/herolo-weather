import { Action } from '@ngrx/store';
import { CityInfo } from '../Models/city.InterFace';
import * as Temperature from '../actions/temperature.action';



export function tempReducer(state: boolean = true, action: Temperature.tempActions ) {
  switch(action.type) {
    case Temperature.TEMPERATURE:
      return action.payload;
    default:
      return state;
  }
}
