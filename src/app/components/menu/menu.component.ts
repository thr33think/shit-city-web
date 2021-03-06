import { Animations } from './../shared/animations';
import { TurdApiService } from './../../services/turd-api.service';
import { GeolocationService } from './../../services/geolocation.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [Animations.opacity, Animations.slideInOut]
})
export class MenuComponent implements OnInit {

  turdModal: boolean;
  infoModal: boolean;
  webcamState = false;
  lat: number;
  lng: number;
  response: any;

  @Output() centerMap = new EventEmitter();
  @Output() reRenderTurds = new EventEmitter();

  visible = false;
  webcamImage: WebcamImage = null;

  private trigger: Subject<void> = new Subject<void>();

  constructor(private geolocationService: GeolocationService, private turdApi: TurdApiService) { }

  ngOnInit() {
    this.geolocationService.getPosition()
      .subscribe((res) => {
        this.lat = res.coords.latitude;
        this.lng = res.coords.longitude;
      });
  }

  triggerSnapshot(): void {
    this.webcamState = false;
    this.trigger.next();
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  centerPosition() {
    this.centerMap.next();
  }

  toggleInfo() {
    this.visible = !this.visible;
    this.infoModal = !this.infoModal;
  }

  toggleTurdModal() {
    this.webcamState = !this.webcamState;
    this.visible = !this.visible;
    this.turdModal = !this.turdModal;
  }

  restartCapture() {
    this.webcamState = !this.webcamState;
    this.webcamImage = null;
  }

  returnToMap() {
    this.visible = !this.visible;
    this.turdModal = !this.turdModal;
    this.webcamImage = null;
    this.response = null;
    this.reRenderTurds.next();
  }

  async uploadTurd() {
    const uploadData = {
      id: '',
      image_base64: `${this.webcamImage.imageAsBase64}`,
      image_url: '',
      lat: this.lat,
      long: this.lng,
      timestamp: (new Date).getTime().toString(),
      visible: true
    };
    const upload = await this.turdApi.postTurd(uploadData);
    this.response = upload;
  }
}
