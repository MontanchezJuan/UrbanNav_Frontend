import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfileService } from '../../services/profile.service';

type Role = 'cliente' | 'conductor';

@Component({
  selector: 'profile-select-role-page',
  templateUrl: './select-role-page.component.html',
  styles: ``,
})
export class SelectRolePageComponent {
  constructor(
    private router: Router,
    private profileService: ProfileService,
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

        this.profileService.matchRole(id_role).subscribe(() =>
          Swal.fire({
            color: '#0F0F0F',
            confirmButtonColor: '#0F0F0F',
            icon: 'success',
            iconColor: '#0F0F0F',
            title: 'Todo correcto',
          }),
        );
      }
    });
  }
}
