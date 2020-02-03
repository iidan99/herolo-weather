import { CityInfo } from '../Models/city.InterFace';
import * as city from '../actions/city-select.action';
import { WeatherInfo } from '../Models/weatherInfo.InterFace';

export interface SelectState {
  selectCity: CityInfo;
  weatherInfo: WeatherInfo;
}

export const initialState: SelectState = {
  selectCity: null,
  weatherInfo: null
};

export function cityReducer(state: SelectState = initialState, action: city.cityActions ) {
  switch (action.type) {
    case city.CITY_SELECT:
      return {
        ...state,
        selectCity: action.payload
      };
      case city.CITY_SUCCESS:
      return {
        ...state,
        weatherInfo: action.payload
      };
      case city.CITY_FAIL:
    default:
      return state;
  }
}