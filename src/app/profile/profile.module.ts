import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SelectRolePageComponent } from './pages/select-role-page/select-role-page.component';
import { CreateProfilePageComponent } from './pages/create-profile-page/create-profile-page.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    SelectRolePageComponent,
    CreateProfilePageComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ProfileModule {}
