import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Marker } from '../interfaces/marker';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TurdApiService {

  markers: Marker[] = [
    {
      lat: 51.673858,
      long: 7.815982,
      id: 'A',
      image_base64: '/assets/images/poo.png',
      timestamp: '0',
      visible: true
    },
    {
      lat: 51.373858,
      long: 7.215982,
      id: 'B',
      image_base64: '/assets/images/poo.png',
      timestamp: '0',
      visible: true
    },
    {
      lat: 51.723858,
      long: 7.895982,
      id: 'C',
      image_base64: '/assets/images/poo.png',
      timestamp: '0',
      visible: true
    }
  ];

  constructor(private http: HttpClient) { }

  async getTurds(): Promise<any> {
    const markers = await this.http.get(`${environment.apiUrl}/turds`, {
      headers: new HttpHeaders().set('Authorization', 'Basic YXBwOmpCSDNKSnZnN0d1VTFIQ00zZkxuSnQxQXE=')
    }).toPromise();
    return markers;
  }

  async uploadTurd(bodyData): Promise<any> {
    const upload = await this.http.post(`${environment.apiUrl}/turds`, bodyData, {
      headers: new HttpHeaders().set('Authorization', 'Basic YXBwOmpCSDNKSnZnN0d1VTFIQ00zZkxuSnQxQXE=')
    }).toPromise();
    console.log(upload);
    return upload;
  }

}
