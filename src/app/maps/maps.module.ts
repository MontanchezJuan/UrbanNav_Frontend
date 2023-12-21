import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { environments } from '../../environments/environments';

import mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = environments.mapbox_key;

@NgModule({
  declarations: [SideMenuComponent, MapsLayoutComponent, FullScreenComponent],
  imports: [CommonModule, MapsRoutingModule],
  exports: [FullScreenComponent],
})
export class MapsModule {}
