import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WeatherServiceService } from '../services/weather-service.service';
import { CitySelect, CitySuccess, CityFail, CITY_SELECT } from '../actions/index';
import { AppState } from '../app.state';


@Injectable()

export class CityEffects {
    citySelect$ = createEffect(() =>
        this.actions$.pipe(
            ofType<CitySelect>(CITY_SELECT),
            mergeMap(({ type, payload, temp }) => this.weatherService.getWeatherInfo(payload.Key, temp).pipe(
                map(res => new CitySuccess(res)),
                catchError((e) => of(new CityFail(e)))
                ))
        )
    );
    constructor(
        private actions$: Actions,
        private weatherService: WeatherServiceService,
        private store: Store<AppState>
    ) { }

}
