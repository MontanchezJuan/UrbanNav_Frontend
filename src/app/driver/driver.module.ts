import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { MapsModule } from '../maps/maps.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [LayoutPageComponent, HomePageComponent],
  imports: [CommonModule, DriverRoutingModule, MapsModule, SharedModule],
})
export class DriverModule {}
