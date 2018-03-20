import { Injectable } from '@angular/core';
import { Marker } from '../interfaces/marker';

@Injectable()
export class TurdApiService {

  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      id: 'A',
      imagePath: '/assets/images/poo.png',
      timestamp: '0'
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      id: 'B',
      imagePath: '/assets/images/poo.png',
      timestamp: '0'
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      id: 'C',
      imagePath: '/assets/images/poo.png',
      timestamp: '0'
    }
  ];

  constructor() { }

  getTurds(): Marker[] {
    return this.markers;
  }

}
