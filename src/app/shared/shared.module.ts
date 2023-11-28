import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { CreateProfilePageComponent } from './pages/userprofile/create-profile-page/create-profile-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { ListProfilePageComponent } from './pages/userprofile/list-profile-page/list-profile-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LogoComponent } from './components/logo/logo.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    CreateProfilePageComponent,
    Error404PageComponent,
    ListProfilePageComponent,
    LoadingSpinnerComponent,
    LogoComponent,
    LogoutComponent,
  ],
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    CreateProfilePageComponent,
    Error404PageComponent,
    ListProfilePageComponent,
    LoadingSpinnerComponent,
    LogoComponent,
    LogoutComponent,
  ],
})
export class SharedModule {}
