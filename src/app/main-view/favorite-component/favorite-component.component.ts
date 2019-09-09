import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CityInfo } from 'src/app/Models/city.InterFace';

@Component({
  selector: 'app-favorite-component',
  templateUrl: './favorite-component.component.html',
  styleUrls: ['./favorite-component.component.scss']
})
export class FavoriteComponentComponent implements OnInit {

  constructor() { }
  @Input() favoriteData: CityInfo[] = [];
  @Output() favoriteSelected: EventEmitter<CityInfo> = new EventEmitter<CityInfo>();

  ngOnInit() {

  }

  favoriteSelect(element){
    console.log(element);
    this.favoriteSelected.emit(element);
  }

  addFavorite(city: CityInfo){
    if(!this.favoriteData.includes(city)) {
      this.favoriteData.push(city);
      console.log(this.favoriteData);
    }
  }

}
