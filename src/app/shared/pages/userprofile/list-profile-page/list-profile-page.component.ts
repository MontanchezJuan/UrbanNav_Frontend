import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UserProfileService } from '../../../services/ms-security/user-profile.service';
import { UserProfile } from '../../../interfaces/ms-security/users-profile.interface';

@Component({
  selector: 'shared-list-profile-page',
  templateUrl: './list-profile-page.component.html',
  styles: ``,
})
export class ListProfilePageComponent implements OnInit {
  public isLoading: boolean = false;
  public userProfiles?: UserProfile[] = [];

  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.listUserProfiles();
  }

  listUserProfiles(): void {
    this.userProfileService.index().subscribe({
      next: (response) => {
        this.isLoading = false;

        this.userProfiles = response.data;
      },
      error: (message) => {
        this.isLoading = false;

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

  onDelete(id: string): void {
    Swal.fire({
      cancelButtonColor: '#B2B2B2',
      cancelButtonText: 'No, cancelar',
      color: '#0F0F0F',
      confirmButtonColor: '#0F0F0F',
      confirmButtonText: 'Si, estoy seguro',
      icon: 'info',
      iconColor: '#0F0F0F',
      showCancelButton: true,
      text: `Deseas eliminar el perfil con id ${id}`,
      title: '¿Estás seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userProfileService.destroy(id).subscribe({
          next: (response) => {
            this.isLoading = false;

            this.listUserProfiles();

            Swal.fire({
              color: '#0F0F0F',
              confirmButtonColor: '#0F0F0F',
              icon: 'success',
              iconColor: '#0F0F0F',
              title: `${response.message}`,
            });
          },
          error: (message) => {
            this.isLoading = false;

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

  navegateTo(path: string): void {
    this.router.navigateByUrl(`${path}`);
  }
}
