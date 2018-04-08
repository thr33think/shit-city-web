import { GeolocationService } from './services/geolocation.service';
import { TurdApiService } from './services/turd-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'materialize-css';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';

import { GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDenChhf07VG7-VrijqSDS15H_Y4ngfvH0'
    }),
    WebcamModule
  ],
  providers: [TurdApiService, GeolocationService, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
