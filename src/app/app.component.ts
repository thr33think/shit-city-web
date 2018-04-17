import { versions } from './../environments/versions';
import { MapComponent } from './components/map/map.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as data from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  private styleGreen = 'color:white; background:#61ba96';
  private styleRed = 'color:white; background:#d36a6a';
  private styleOrange = 'color:white; background:#F29526';
  private styleBlueish = 'color:white; background:#99C7FF';


  @ViewChild(MapComponent) map;

  constructor() {}

  ngOnInit() {
    console.log(
      '%c Threethink %c v' +
      (<any>data).version +
      ' %c Revision: ' +
      (<any>versions).revision +
      ' %c Branch: ' +
      (<any>versions).branch +
      ' ',

      this.styleGreen,
      this.styleRed,
      this.styleOrange,
      this.styleBlueish
    );
  }

  centerMap() {
    this.map.centerMap();
  }

  reRenderTurds() {
    this.map.getTurds();
  }

}
