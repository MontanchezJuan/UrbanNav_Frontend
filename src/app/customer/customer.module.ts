import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { CustomerRoutingModule } from './customer-routing.module';
import { MapsModule } from '../maps/maps.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchServiceComponent } from './components/search-service/search-service.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    HomePageComponent,
    SearchServiceComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MapsModule,
    MatIconModule,
    SharedModule,
  ],
})
export class CustomerModule {}
