import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { LogoComponent } from './components/logo/logo.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [Error404PageComponent, LogoComponent, LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [Error404PageComponent, LogoComponent, LoadingSpinnerComponent],
})
export class SharedModule {}
