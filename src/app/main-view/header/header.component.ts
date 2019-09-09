import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
@Output() switchFavorite: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit() {
  }

  onFavorite(value: boolean){
    this.switchFavorite.emit(value);
  }
}
