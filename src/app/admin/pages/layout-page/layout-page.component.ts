import { Component } from '@angular/core';

interface Routes {
  name: string;
  routerLink: string;
}

@Component({
  selector: 'admin-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {
  public routes: Routes[] = [
    { name: 'users', routerLink: 'list-users' },
    { name: 'users profiles', routerLink: 'list-user-profiles' },
    { name: 'roles', routerLink: 'list-roles' },
    { name: 'permissions', routerLink: 'list-permissions' },
    { name: 'credit cards', routerLink: 'list-credit-cards' },
    { name: 'bills', routerLink: 'list-bills' },
    { name: 'comments and rating', routerLink: 'list-comments-and-rating' },
    { name: 'contacts', routerLink: 'list-contacts' },
    { name: 'customers', routerLink: 'list-customers' },
    { name: 'drivers', routerLink: 'list-drivers' },
    { name: 'licenses', routerLink: 'list-licenses' },
    { name: 'services', routerLink: 'list-services' },
    { name: 'trip points', routerLink: 'list-trip-points' },
    { name: 'trips', routerLink: 'list-trips' },
    { name: 'points', routerLink: 'list-points' },
    { name: 'vehicles', routerLink: 'list-vehicles' },
  ];
}
