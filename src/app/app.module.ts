import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { SearchComponentComponent } from './Main-View/search-component/search-component.component';
import { FavoriteComponentComponent } from './Main-View/favorite-component/favorite-component.component';
import { DayPanelsComponentComponent } from './Main-View/day-panels-component/day-panels-component.component';
import { DayPanelComponentComponent } from './main-view/day-panels-component/day-panel-component/day-panel-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './main-view/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
