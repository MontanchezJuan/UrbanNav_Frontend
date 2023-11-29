import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../../shared/services/ms-security/user.service';

type Role = 'cliente' | 'conductor';

@Component({
  selector: 'profile-select-role-page',
  templateUrl: './select-role-page.component.html',
  styles: ``,
})
export class SelectRolePageComponent {
  public isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {}

  selectRole(role: Role) {
    Swal.fire({
      cancelButtonColor: '#B2B2B2',
      cancelButtonText: 'No, cancelar',
      color: '#0F0F0F',
      confirmButtonColor: '#0F0F0F',
      confirmButtonText: 'Si, estoy seguro',
      icon: 'info',
      iconColor: '#0F0F0F',
      showCancelButton: true,
      text: `Después no se podrá cambiar tu tipo de usuario.`,
      title: `¿Estás seguro que deseas viajar como ${role}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        let id_role: string = '';

        switch (role) {
          case 'cliente':
            id_role = '65623164f64496333a4df52f';
            break;
          case 'conductor':
            id_role = '656230d6f64496333a4df52e';
            break;

          default:
            break;
        }

        const user = this.authService.currentUser;

        this.userService.matchRole(user._id, id_role).subscribe({
          next: (response) =>
            Swal.fire({
              color: '#0F0F0F',
              confirmButtonColor: '#0F0F0F',
              icon: 'success',
              iconColor: '#0F0F0F',
              title: `${response.message}`,
            }).then(() => {
              this.router.navigateByUrl('profile/costumize-profile');

              this.isLoading = false;
            }),
          error: (message) => {
            Swal.fire({
              color: '#0F0F0F',
              confirmButtonColor: '#0F0F0F',
              icon: 'error',
              iconColor: '#0F0F0F',
              title: 'Error',
              text: message,
            });
          },
        });
      }
    });
  }
}
