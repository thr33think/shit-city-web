import { GeolocationService } from './../../services/geolocation.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(+100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(+100%)' }))
      ])
    ]),
    trigger('opacityFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {

  @Output() centerMap = new EventEmitter();


  visible = false;

  constructor(private geolocationService: GeolocationService) { }

  ngOnInit() {
  }

  centerPosition() {
    this.centerMap.next();
  }

  addTurd() {
    this.visible = !this.visible;
  }
}
