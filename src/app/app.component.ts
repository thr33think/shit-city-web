import { MapComponent } from './components/map/map.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  @ViewChild(MapComponent) map;

  constructor() {}

  ngOnInit() {}

  centerMap() {
    this.map.centerMap();
  }

}
