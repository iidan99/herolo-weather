import { ActionReducerMap } from '@ngrx/store';
import * as searchReducer from './search.reducer';
import * as selectCity from './city.select.reducer';
export interface ProductsState {
    cities: searchReducer.SearchState;
    // city:  selectCity.SelectState;
}

export const reducers: ActionReducerMap<ProductsState> = {
 cities: searchReducer.reducer,
//  city: selectCity.reducer,

};
