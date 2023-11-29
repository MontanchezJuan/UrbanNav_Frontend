import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { License } from '../../../interfaces/ms-business/license.interface';
import { LicenseService } from '../../../services/ms-business/license.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'shared-list-license-page',
  templateUrl: './list-license-page.component.html',
  styles: ``,
})
export class ListLicensePageComponent {
  public isLoading: boolean = false;
  public licenses?: License[] = [];

  constructor(
    private router: Router,
    private licenseService: LicenseService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.listLicenses();
  }

  listLicenses(): void {
    this.licenseService.index().subscribe({
      next: (response) => {
        this.isLoading = false;

        this.licenses = response.data.data;
      },
      error: (message) => {
        this.isLoading = false;

        this.swalService.error(message);
      },
    });
  }

  onDelete(id: number): void {
    Swal.fire({
      cancelButtonColor: '#B2B2B2',
      cancelButtonText: 'No, cancelar',
      color: '#0F0F0F',
      confirmButtonColor: '#0F0F0F',
      confirmButtonText: 'Si, estoy seguro',
      icon: 'info',
      iconColor: '#0F0F0F',
      showCancelButton: true,
      text: `Deseas eliminar la licensia con id ${id}`,
      title: '¿Estás seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.licenseService.destroy(id).subscribe({
          next: (response) => {
            this.isLoading = false;

            this.listLicenses();

            Swal.fire({
              color: '#0F0F0F',
              confirmButtonColor: '#0F0F0F',
              icon: 'success',
              iconColor: '#0F0F0F',
              title: `${response.mensaje}`,
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
