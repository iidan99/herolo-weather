import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { SearchComponentComponent } from './main-view/search-component/search-component.component';
import { FavoriteComponentComponent } from './main-view/favorite-component/favorite-component.component';
import { DayPanelsComponentComponent } from './main-view/day-panels-component/day-panels-component.component';
import { DayPanelComponentComponent } from './main-view/day-panels-component/day-panel-component/day-panel-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './main-view/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { rootReducer } from './app.state';
import { effects } from './effects';


@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    SearchComponentComponent,
    FavoriteComponentComponent,
    DayPanelsComponentComponent,
    DayPanelComponentComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([AppEffects, ...effects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
