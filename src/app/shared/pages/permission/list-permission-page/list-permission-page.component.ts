import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { SwalService } from '../../../services/swal.service';
import { PermissionService } from '../../../services/ms-security/permission.service';
import { Permission } from '../../../interfaces/ms-security/permission.interface';

@Component({
  selector: 'shared-list-permission-page',
  templateUrl: './list-permission-page.component.html',
  styles: ``,
})
export class ListPermissionPageComponent implements OnInit {
  public isLoading: boolean = false;
  public permissions?: Permission[] = [];

  constructor(
    private router: Router,
    private permissionServive: PermissionService,
    private swalService: SwalService,
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.listPermissions();
  }
  listPermissions(): void {
    this.permissionServive.index().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.permissions = response.data;
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
      text: `Deseas eliminar el permiso con id ${id}`,
      title: '¿Estás seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.permissionServive.destroy(id).subscribe({
          next: (response) => {
            this.isLoading = false;

            this.listPermissions();

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
