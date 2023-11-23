import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PqrsPageComponent } from './pages/pqrs-page/pqrs-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AboutPageComponent,
    HomePageComponent,
    LayoutPageComponent,
    PqrsPageComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
