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
import { ListUserPageComponent } from './pages/user/list-user-page/list-user-page.component';
import { CreateUserPageComponent } from './pages/user/create-user-page/create-user-page.component';
import { ListRolesPageComponent } from './pages/roles/list-roles-page/list-roles-page.component';
import { CreateRolePageComponent } from './pages/roles/create-role-page/create-role-page.component';
import { CreatePermissionPageComponent } from './pages/permission/create-permission-page/create-permission-page.component';
import { ListPermissionPageComponent } from './pages/permission/list-permission-page/list-permission-page.component';
import { ListCreditcardPageComponent } from './pages/creditcard/list-creditcard-page/list-creditcard-page.component';
import { CreateCreditcardPageComponent } from './pages/creditcard/create-creditcard-page/create-creditcard-page.component';
import { CreateBillPageComponent } from './pages/bill/create-bill-page/create-bill-page.component';
import { ListBillPageComponent } from './pages/bill/list-bill-page/list-bill-page.component';
import { ListCommentsAndRatingPageComponent } from './pages/commentsAndRating/list-comments-and-rating-page/list-comments-and-rating-page.component';
import { CreateCommentsAndRatingPageComponent } from './pages/commentsAndRating/create-comments-and-rating-page/create-comments-and-rating-page.component';
import { ListContactPageComponent } from './pages/contact/list-contact-page/list-contact-page.component';
import { CreateContactPageComponent } from './pages/contact/create-contact-page/create-contact-page.component';
import { CreateCustomerPageComponent } from './pages/customer/create-customer-page/create-customer-page.component';
import { ListCustomerPageComponent } from './pages/customer/list-customer-page/list-customer-page.component';
import { ListDriverPageComponent } from './pages/driver/list-driver-page/list-driver-page.component';
import { CreateDriverPageComponent } from './pages/driver/create-driver-page/create-driver-page.component';
import { CreateLicensePageComponent } from './pages/license/create-license-page/create-license-page.component';
import { ListLicensePageComponent } from './pages/license/list-license-page/list-license-page.component';
import { ListServicePageComponent } from './pages/service/list-service-page/list-service-page.component';
import { CreateServicePageComponent } from './pages/service/create-service-page/create-service-page.component';
import { CreateTripPointsPageComponent } from './pages/tripPoints/create-trip-points-page/create-trip-points-page.component';
import { ListTripPointsPageComponent } from './pages/tripPoints/list-trip-points-page/list-trip-points-page.component';
import { ListTripPageComponent } from './pages/trip/list-trip-page/list-trip-page.component';
import { CreateTripPageComponent } from './pages/trip/create-trip-page/create-trip-page.component';
import { CreatePointPageComponent } from './pages/point/create-point-page/create-point-page.component';
import { ListPointPageComponent } from './pages/point/list-point-page/list-point-page.component';
import { ListVehiclePageComponent } from './pages/vehicle/list-vehicle-page/list-vehicle-page.component';
import { CreateVehiclePageComponent } from './pages/vehicle/create-vehicle-page/create-vehicle-page.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { LimitLetters } from './pipes/LimitLetters.pipe';

@NgModule({
  declarations: [
    CreateProfilePageComponent,
    Error404PageComponent,
    ListProfilePageComponent,
    LoadingSpinnerComponent,
    LogoComponent,
    LogoutComponent,
    ListUserPageComponent,
    CreateUserPageComponent,
    ListRolesPageComponent,
    CreateRolePageComponent,
    CreatePermissionPageComponent,
    ListPermissionPageComponent,
    ListCreditcardPageComponent,
    CreateCreditcardPageComponent,
    CreateBillPageComponent,
    ListBillPageComponent,
    ListCommentsAndRatingPageComponent,
    CreateCommentsAndRatingPageComponent,
    ListContactPageComponent,
    CreateContactPageComponent,
    CreateCustomerPageComponent,
    ListCustomerPageComponent,
    ListDriverPageComponent,
    CreateDriverPageComponent,
    CreateLicensePageComponent,
    ListLicensePageComponent,
    ListServicePageComponent,
    CreateServicePageComponent,
    CreateTripPointsPageComponent,
    ListTripPointsPageComponent,
    ListTripPageComponent,
    CreateTripPageComponent,
    CreatePointPageComponent,
    ListPointPageComponent,
    ListVehiclePageComponent,
    CreateVehiclePageComponent,
    CardProfileComponent,
    LimitLetters,
  ],
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    CardProfileComponent,
    CreateProfilePageComponent,
    Error404PageComponent,
    ListProfilePageComponent,
    LoadingSpinnerComponent,
    LogoComponent,
    LogoutComponent,
  ],
})
export class SharedModule {}
