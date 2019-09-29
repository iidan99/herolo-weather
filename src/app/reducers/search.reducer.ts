import { Action } from '@ngrx/store';
import { CityInfo } from '../Models/city.InterFace';
import * as LocationAction from '../actions/search-list.actions';

export interface SearchState {
  cities: CityInfo[];
}

export const initialState: SearchState = {
  cities: []
};

export function reducer(state: SearchState = initialState, action: LocationAction.Actions ) {
  switch(action.type) {
    case LocationAction.SEARCH_SUCCESS:
      return {
        ...state,
        cities: action.payload
      };
    case LocationAction.SEARCH:
    default:
      return state;
  }
}
