import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SelectRolePageComponent } from './pages/select-role-page/select-role-page.component';
import { CreateProfilePageComponent } from './pages/create-profile-page/create-profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: SelectRolePageComponent },
      { path: 'costumize-profile', component: CreateProfilePageComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
