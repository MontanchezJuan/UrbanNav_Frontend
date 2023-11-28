import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  authCanActivateGuard,
  authCanMatchGuard,
} from './auth/guards/auth.guard';
import { profileCanMatchGuard } from './profile/guards/profile.guard';
import { publicCanActivateGuard } from './auth/guards/public.guard';

import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [publicCanActivateGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [publicCanActivateGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authCanActivateGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
    canActivate: [authCanActivateGuard],
  },
  {
    path: 'driver',
    loadChildren: () =>
      import('./driver/driver.module').then((m) => m.DriverModule),
    canActivate: [authCanActivateGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canMatch: [authCanMatchGuard, profileCanMatchGuard],
    canActivate: [authCanActivateGuard],
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
