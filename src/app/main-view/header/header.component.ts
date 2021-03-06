import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
@Output() switchFavorite: EventEmitter<boolean> = new EventEmitter<boolean>(false);
@Output() temperatureVal: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }
  switch = new FormControl(true);
  ngOnInit() {
  }

  onFavorite(value: boolean){
    this.switchFavorite.emit(value);
  }
  onCheck(){
    this.switch.setValue(!this.switch.value);
    this.temperatureVal.emit(this.switch.value);
  }
}
