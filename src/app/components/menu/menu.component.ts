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
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)' }))
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
