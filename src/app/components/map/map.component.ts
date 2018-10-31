import { GeolocationService } from './../../services/geolocation.service';
import { Component, OnInit, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { AgmMap } from '@agm/core';
import { TurdApiService } from '../../services/turd-api.service';
import { Marker, Markers } from '../../interfaces/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  @ViewChild(AgmMap) myMap: any;
  @Output() showTurdDetail = new EventEmitter<Marker>();

  markerIcon = {
    url: require('../../../assets/images/turd-pin.svg'),
    scaledSize: {
      width: 600 / 8,
      height: 800 / 8
    },
    zIndex: 998
  };

  locationMarkerIcon = {
    url: require('../../../assets/images/location-marker.svg'),
    scaledSize: {
      width: 679 / 22,
      height: 865 / 22
    }
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
    const activeTurd = await this.getTurd(marker.id);
    this.showTurdDetail.emit(activeTurd);
  }

  centerMap() {
    this.myMap._mapsWrapper.panTo({ lat: this.lat, lng: this.lng });
  }
}
