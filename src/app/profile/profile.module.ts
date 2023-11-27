import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SelectRolePageComponent } from './pages/select-role-page/select-role-page.component';

@NgModule({
  declarations: [LayoutPageComponent, SelectRolePageComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, MatIconModule],
})
export class ProfileModule {}
