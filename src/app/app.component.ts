import { Component } from '@angular/core';
import {searchReducer} from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Weather-work-herolo';
  searchReducer
}
