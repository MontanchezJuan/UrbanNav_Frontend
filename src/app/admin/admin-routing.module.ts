import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListProfilePageComponent } from '../shared/pages/userprofile/list-profile-page/list-profile-page.component';
import { CreateProfilePageComponent } from '../shared/pages/userprofile/create-profile-page/create-profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: HomePageComponent },
      {
        path: 'list-user-profiles',
        component: ListProfilePageComponent,
      },
      {
        path: 'create-profile',
        component: CreateProfilePageComponent,
      },
      {
        path: 'edit-profile/:id',
        component: CreateProfilePageComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
