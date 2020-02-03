import { CityInfo } from './Models/city.InterFace';
import { searchReducer as searchReducer } from './reducers/search.reducer';
import { cityReducer as cityReducer } from './reducers/city.select.reducer';
import { tempReducer as temperatureReducer } from './reducers/temperature.reducer';
import { WeatherInfo } from './Models/weatherInfo.InterFace';
import { favoriteReducer as favoriteReducer } from './reducers/favorite.reducer';

export interface AppState {
    readonly search: CityInfo[];
    readonly citySelect: CityInfo;
    // readonly val: boolean;
    readonly weather: WeatherInfo;
    readonly favorite: CityInfo[];
}

export const rootReducer = {
    search: searchReducer,
    citySelect: cityReducer,
    val: temperatureReducer,
    favorite: favoriteReducer
};
