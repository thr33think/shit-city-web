import { Observable } from 'rxjs/Observable';
import { GeolocationService } from './../../services/geolocation.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MouseEvent, AgmMap } from '@agm/core';
import { TurdApiService } from '../../services/turd-api.service';
import { Marker } from '../../interfaces/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  @ViewChild(AgmMap) myMap: any;

  activeTurd: Marker = {
    lat: 0,
    lng: 0,
    id: '0',
    imagePath: '/assets/images/poo.png',
    timestamp: '0',
  };

  // google maps zoom level
  zoom = 8;

  // initial center position for the map
  lat = 48.7618486;
  lng = 9.17261890;

  markers: Marker[];

  constructor(private turdApi: TurdApiService, private geolocationService: GeolocationService) { }

  ngOnInit() {
    this.getTurds();
    this.getCurrentLocation();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.myMap.triggerResize()
      .then(() => this.myMap._mapsWrapper.setCenter({ lat: this.lat, lng: this.lng }));
  }

  async getTurds() {
    this.markers = await this.turdApi.getTurds();
  }

  getCurrentLocation() {
    this.geolocationService.getPosition()
      .subscribe((res) => {
        this.lat = res.coords.latitude;
        this.lng = res.coords.longitude;
        this.zoom = 12;
      });
  }

  zoomChange(zoom) {
    this.zoom = zoom;
  }

  markerClicked(marker) {
    this.activeTurd = marker;
  }

  centerMap() {
    this.myMap._mapsWrapper.panTo({ lat: this.lat, lng: this.lng });
  }

  // mapClicked($event: MouseEvent) {
  //   send put request to api
  // }

  // markerDragEnd(m: Marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }

}
