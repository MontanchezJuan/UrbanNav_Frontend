import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { SwalService } from '../../../services/swal.service';
import { RoleService } from '../../../services/ms-security/role.service';

import { Role } from '../../../interfaces/ms-security/role.interface';
@Component({
  selector: 'shared-list-roles-page',
  templateUrl: './list-roles-page.component.html',
  styles: ``,
})
export class ListRolesPageComponent implements OnInit {
  public isLoading: boolean = false;
  public roles?: Role[] = [];

  constructor(
    private router: Router,
    private rolesService: RoleService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.listRoles();
  }

  listRoles(): void {
    this.rolesService.index().subscribe({
      next: (response) => {
        this.isLoading = false;

        this.roles = response.data;
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
      text: `Deseas eliminar el rol con id ${id}`,
      title: '¿Estás seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesService.destroy(id).subscribe({
          next: (response) => {
            this.isLoading = false;

            this.listRoles();

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
