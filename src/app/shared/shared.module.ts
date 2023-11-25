import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { LogoComponent } from './components/logo/logo.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    Error404PageComponent,
    LoadingSpinnerComponent,
    LogoComponent,
    LogoutComponent,
  ],
  imports: [CommonModule, MatIconModule],
  exports: [
    Error404PageComponent,
    LoadingSpinnerComponent,
    LogoComponent,
    LogoutComponent,
  ],
})
export class SharedModule {}
