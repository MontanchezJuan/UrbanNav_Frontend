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
    { name: 'bills', routerLink: 'list-bills' },
    { name: 'comments and rating', routerLink: 'list-comments-and-rating' },
    { name: 'contacts', routerLink: 'list-contacts' },
    { name: 'credit cards', routerLink: 'list-credit-cards' },
    { name: 'customers', routerLink: 'list-customers' },
    { name: 'drivers', routerLink: 'list-drivers' },
    { name: 'licenses', routerLink: 'list-licenses' },
    { name: 'permissions', routerLink: 'list-permissions' },
    { name: 'points', routerLink: 'list-points' },
    { name: 'roles', routerLink: 'list-roles' },
    { name: 'services', routerLink: 'list-services' },
    { name: 'trip points', routerLink: 'list-trip-points' },
    { name: 'trips', routerLink: 'list-trips' },
    { name: 'users profiles', routerLink: 'list-user-profiles' },
    { name: 'users', routerLink: 'list-users' },
    { name: 'vehicles', routerLink: 'list-vehicles' },
  ];
}
