import * as favoriteAction from '../actions/favorite.action';
import { CityInfo } from '../Models/city.InterFace';

export interface FavoriteSelector {
 favorites: CityInfo[];
}

const initialState: FavoriteSelector = {
    favorites: []
};

export function favoriteReducer(state: FavoriteSelector = initialState, action: favoriteAction.favoriteActions){
    switch (action.type) {
        case favoriteAction.FAVORITE_ADD:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        case favoriteAction.FAVORITE_REMOVE:
            return {
                ...state,
                favorites: [...state.favorites.filter(favor => favor !== action.payload)]
            };
            default:
               return state;
    }
}
