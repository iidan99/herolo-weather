import { CityInfo } from './Models/city.InterFace';
import { reducer as searchReducer } from './reducers/search.reducer';
import { reducer as cityReducer } from './reducers/city.select.reducer';
import { reducer as temperatureReducer } from './reducers/temperature.reducer';
import { WeatherInfo } from './Models/weatherInfo.InterFace';

export interface AppState {
    readonly search: CityInfo[];
    readonly citySelect: CityInfo;
    readonly val: boolean;
    readonly weather: WeatherInfo;
}

export const rootReducer = {
    search: searchReducer,
    citySelect: cityReducer,
    val: temperatureReducer
};
