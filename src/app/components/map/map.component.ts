import { Observable } from 'rxjs/Observable';
import { GeolocationService } from './../../services/geolocation.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MouseEvent, AgmMap } from '@agm/core';
import { TurdApiService } from '../../services/turd-api.service';
import { Marker, Markers } from '../../interfaces/marker';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  @ViewChild(AgmMap) myMap: any;

  activeTurd: Marker = {
    lat: 0,
    long: 0,
    id: '0',
    image_base64: '',
    visible: false,
    timestamp: '0',
  };

  // google maps zoom level
  zoom = 8;

  // initial center position for the map
  lat = 48.7618486;
  lng = 9.17261890;

  markers: Markers[];

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

  async getTurd(id) {
    return await this.turdApi.getTurd(id);
  }

  getCurrentLocation() {
    this.geolocationService.getPosition()
      .subscribe((res) => {
        this.lat = res.coords.latitude;
        this.lng = res.coords.longitude;
        this.zoom = 16;
      });
  }

  zoomChange(zoom) {
    this.zoom = zoom;
  }

  async markerClicked(marker) {
    this.activeTurd = await this.getTurd(marker.id);
  }

  centerMap() {
    this.myMap._mapsWrapper.panTo({ lat: this.lat, lng: this.lng });
  }

  getFormattedTimestamp(timeInMilliSeconds) {
    return moment(parseInt(timeInMilliSeconds, 10)).format('DD.MM.YYYY HH:mm');
  }

  // mapClicked($event: MouseEvent) {
  //   send put request to api
  // }

  // markerDragEnd(m: Marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }

}
