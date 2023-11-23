import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  authCanActivateGuard,
  authCanMatchGuard,
} from './auth/guards/auth.guard';
import {
  publicCanActivateGuard,
  publicCanMatchGuard,
} from './auth/guards/public.guard';

import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [publicCanActivateGuard],
    canMatch: [publicCanMatchGuard],
    // canActivate: [authCanActivateGuard],
    // canMatch: [authCanMatchGuard],
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
