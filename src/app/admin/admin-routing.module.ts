import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListProfilePageComponent } from '../shared/pages/userprofile/list-profile-page/list-profile-page.component';
import { CreateProfilePageComponent } from '../shared/pages/userprofile/create-profile-page/create-profile-page.component';
import { ListUserPageComponent } from '../shared/pages/user/list-user-page/list-user-page.component';
import { CreateUserPageComponent } from '../shared/pages/user/create-user-page/create-user-page.component';
import { ListRolesPageComponent } from '../shared/pages/roles/list-roles-page/list-roles-page.component';
import { CreateRolePageComponent } from '../shared/pages/roles/create-role-page/create-role-page.component';
import { ListPermissionPageComponent } from '../shared/pages/permission/list-permission-page/list-permission-page.component';
import { CreatePermissionPageComponent } from '../shared/pages/permission/create-permission-page/create-permission-page.component';
import { ListCreditcardPageComponent } from '../shared/pages/creditcard/list-creditcard-page/list-creditcard-page.component';
import { CreateCreditcardPageComponent } from '../shared/pages/creditcard/create-creditcard-page/create-creditcard-page.component';
import { ListBillPageComponent } from '../shared/pages/bill/list-bill-page/list-bill-page.component';
import { CreateBillPageComponent } from '../shared/pages/bill/create-bill-page/create-bill-page.component';
import { ListCommentsAndRatingPageComponent } from '../shared/pages/commentsAndRating/list-comments-and-rating-page/list-comments-and-rating-page.component';
import { CreateCommentsAndRatingPageComponent } from '../shared/pages/commentsAndRating/create-comments-and-rating-page/create-comments-and-rating-page.component';
import { ListContactPageComponent } from '../shared/pages/contact/list-contact-page/list-contact-page.component';
import { CreateContactPageComponent } from '../shared/pages/contact/create-contact-page/create-contact-page.component';
import { ListCustomerPageComponent } from '../shared/pages/customer/list-customer-page/list-customer-page.component';
import { CreateCustomerPageComponent } from '../shared/pages/customer/create-customer-page/create-customer-page.component';
import { ListDriverPageComponent } from '../shared/pages/driver/list-driver-page/list-driver-page.component';
import { CreateDriverPageComponent } from '../shared/pages/driver/create-driver-page/create-driver-page.component';
import { ListLicensePageComponent } from '../shared/pages/license/list-license-page/list-license-page.component';
import { CreateLicensePageComponent } from '../shared/pages/license/create-license-page/create-license-page.component';
import { ListServicePageComponent } from '../shared/pages/service/list-service-page/list-service-page.component';
import { CreateServicePageComponent } from '../shared/pages/service/create-service-page/create-service-page.component';
import { ListTripPointsPageComponent } from '../shared/pages/tripPoints/list-trip-points-page/list-trip-points-page.component';
import { CreateTripPointsPageComponent } from '../shared/pages/tripPoints/create-trip-points-page/create-trip-points-page.component';
import { ListTripPageComponent } from '../shared/pages/trip/list-trip-page/list-trip-page.component';
import { CreateTripPageComponent } from '../shared/pages/trip/create-trip-page/create-trip-page.component';
import { ListPointPageComponent } from '../shared/pages/point/list-point-page/list-point-page.component';
import { CreatePointPageComponent } from '../shared/pages/point/create-point-page/create-point-page.component';
import { ListVehiclePageComponent } from '../shared/pages/vehicle/list-vehicle-page/list-vehicle-page.component';
import { CreateVehiclePageComponent } from '../shared/pages/vehicle/create-vehicle-page/create-vehicle-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: HomePageComponent },
      {
        path: 'list-users',
        component: ListUserPageComponent,
      },
      {
        path: 'create-user',
        component: CreateUserPageComponent,
      },
      {
        path: 'edit-user/:id',
        component: CreateUserPageComponent,
      },
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
      {
        path: 'list-roles',
        component: ListRolesPageComponent,
      },
      {
        path: 'create-role',
        component: CreateRolePageComponent,
      },
      {
        path: 'edit-role/:id',
        component: CreateRolePageComponent,
      },
      {
        path: 'list-permissions',
        component: ListPermissionPageComponent,
      },
      {
        path: 'create-permission',
        component: CreatePermissionPageComponent,
      },
      {
        path: 'edit-permission/:id',
        component: CreatePermissionPageComponent,
      },
      {
        path: 'list-credit-cards',
        component: ListCreditcardPageComponent,
      },
      {
        path: 'create-credit-cards',
        component: CreateCreditcardPageComponent,
      },
      {
        path: 'edit-credit-cards/:id',
        component: CreateCreditcardPageComponent,
      },
      {
        path: 'list-bills',
        component: ListBillPageComponent,
      },
      {
        path: 'create-bill',
        component: CreateBillPageComponent,
      },
      {
        path: 'edit-bill/:id',
        component: CreateBillPageComponent,
      },
      {
        path: 'list-comments-and-rating',
        component: ListCommentsAndRatingPageComponent,
      },
      {
        path: 'create-comments-and-rating',
        component: CreateCommentsAndRatingPageComponent,
      },
      {
        path: 'edit-comments-and-rating/:id',
        component: CreateCommentsAndRatingPageComponent,
      },
      {
        path: 'list-contacts',
        component: ListContactPageComponent,
      },
      {
        path: 'create-contact',
        component: CreateContactPageComponent,
      },
      {
        path: 'edit-contact/:id',
        component: CreateContactPageComponent,
      },
      {
        path: 'list-customers',
        component: ListCustomerPageComponent,
      },
      {
        path: 'create-customer',
        component: CreateCustomerPageComponent,
      },
      {
        path: 'edit-customer/:id',
        component: CreateCustomerPageComponent,
      },
      {
        path: 'list-drivers',
        component: ListDriverPageComponent,
      },
      {
        path: 'create-driver',
        component: CreateDriverPageComponent,
      },
      {
        path: 'edit-driver/:id',
        component: CreateDriverPageComponent,
      },
      {
        path: 'list-licenses',
        component: ListLicensePageComponent,
      },
      {
        path: 'create-license',
        component: CreateLicensePageComponent,
      },
      {
        path: 'edit-license/:id',
        component: CreateLicensePageComponent,
      },
      {
        path: 'list-services',
        component: ListServicePageComponent,
      },
      {
        path: 'create-service',
        component: CreateServicePageComponent,
      },
      {
        path: 'edit-service/:id',
        component: CreateServicePageComponent,
      },
      {
        path: 'list-trip-points',
        component: ListTripPointsPageComponent,
      },
      {
        path: 'create-trip-point',
        component: CreateTripPointsPageComponent,
      },
      {
        path: 'edit-trip-point/:id',
        component: CreateTripPointsPageComponent,
      },
      {
        path: 'list-trips',
        component: ListTripPageComponent,
      },
      {
        path: 'create-trip',
        component: CreateTripPageComponent,
      },
      {
        path: 'edit-trip/:id',
        component: CreateTripPageComponent,
      },
      {
        path: 'list-points',
        component: ListPointPageComponent,
      },
      {
        path: 'create-point',
        component: CreatePointPageComponent,
      },
      {
        path: 'edit-point/:id',
        component: CreatePointPageComponent,
      },
      {
        path: 'list-vehicles',
        component: ListVehiclePageComponent,
      },
      {
        path: 'create-vehicle',
        component: CreateVehiclePageComponent,
      },
      {
        path: 'edit-vehicle/:id',
        component: CreateVehiclePageComponent,
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
