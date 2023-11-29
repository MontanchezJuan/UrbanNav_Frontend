import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from '../../../services/ms-security/user.service';
import { SwalService } from '../../../services/swal.service';

import { User } from '../../../interfaces/ms-security/users.interface';

@Component({
  selector: 'shared-list-customer-page',
  templateUrl: './list-customer-page.component.html',
  styles: ``,
})
export class ListCustomerPageComponent {
  public isLoading: boolean = false;
  public users?: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.listUser();
  }

  listUser(): void {
    this.userService.index().subscribe({
      next: (response) => {
        this.isLoading = false;

        this.users = response.data;
      },
      error: (message) => {
        this.isLoading = false;

        this.swalService.error(message);
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
      text: `Deseas eliminar el usuario con id ${id}`,
      title: '¿Estás seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.destroy(id).subscribe({
          next: (response) => {
            this.isLoading = false;

            this.listUser();

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

            this.swalService.error(message);
          },
        });
      }
    });
  }

  navegateTo(path: string): void {
    this.router.navigateByUrl(`${path}`);
  }
}
