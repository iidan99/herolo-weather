import { Component, OnInit, NgModule, Output, EventEmitter } from '@angular/core';
import { CityInfo } from 'src/app/interFace/city.InterFace';
import { FavoriteService } from 'src/app/favorite.service';

@Component({
  selector: 'app-favorite-component',
  templateUrl: './favorite-component.component.html',
  styleUrls: ['./favorite-component.component.css']
})
export class FavoriteComponentComponent implements OnInit {

  constructor(private FavoriteService: FavoriteService) { }
  favoriteData: CityInfo[] = [];
  @Output() favoriteSelected: EventEmitter<CityInfo> = new EventEmitter<CityInfo>();
  
  ngOnInit() {
    this.favoriteData = this.FavoriteService.favoriteList;
  }

  favoriteSelect(element){
    console.log(element);
    this.favoriteSelected.emit(element);
  }

}
