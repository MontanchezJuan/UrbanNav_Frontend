import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Response, User } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'costumer-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
