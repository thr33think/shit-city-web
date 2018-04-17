import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Marker, Markers } from '../interfaces/marker';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TurdApiService {

  constructor(private http: HttpClient) { }

  async getTurds(): Promise<Markers[]> {
    const markers = await this.http.get<Markers[]>(`${environment.apiUrl}/turds`, {
      headers: new HttpHeaders().set('Authorization', 'Basic YXBwOmpCSDNKSnZnN0d1VTFIQ00zZkxuSnQxQXE=')
    }).toPromise();
    return markers;
  }

  async getTurd(id: string): Promise<Marker>  {
    const marker = await this.http.get<Marker>(`${environment.apiUrl}/turds/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Basic YXBwOmpCSDNKSnZnN0d1VTFIQ00zZkxuSnQxQXE=')
    }).toPromise();
    return marker;
  }

  async postTurd(bodyData: Marker): Promise<any> {
    const upload = await this.http.post(`${environment.apiUrl}/turds`, bodyData, {
      headers: new HttpHeaders().set('Authorization', 'Basic YXBwOmpCSDNKSnZnN0d1VTFIQ00zZkxuSnQxQXE=')
    }).toPromise();
    return upload;
  }

}
