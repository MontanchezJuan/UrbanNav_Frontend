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
    { name: 'users', routerLink: '' },
    { name: 'users profiles', routerLink: 'list-user-profiles' },
    { name: 'roles', routerLink: '' },
    { name: 'permissions', routerLink: '' },
    { name: 'credit cards', routerLink: '' },
    { name: 'bills', routerLink: '' },
    { name: 'comments and rating', routerLink: '' },
    { name: 'contacts', routerLink: '' },
    { name: 'customers', routerLink: '' },
    { name: 'drivers', routerLink: '' },
    { name: 'licenses', routerLink: '' },
    { name: 'services', routerLink: '' },
    { name: 'trip point', routerLink: '' },
    { name: 'trips', routerLink: '' },
    { name: 'vehicles', routerLink: '' },
  ];
}
