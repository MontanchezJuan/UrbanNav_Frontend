import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    UsersPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
