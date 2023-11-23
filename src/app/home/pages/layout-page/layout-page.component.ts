import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Route {
  routerLink: string;
  name: string;
}

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent {
  public routes: Route[] = [
    { routerLink: 'home', name: 'Inicio' },
    { routerLink: 'about', name: 'Conócenos' },
    { routerLink: 'pqrs', name: 'Ayuda' },
  ];

  constructor(private router: Router) {}

  goLogin(): void {
    this.router.navigateByUrl('auth');
  }

  goSignup(): void {
    this.router.navigateByUrl('auth/sign-up');
  }
}
