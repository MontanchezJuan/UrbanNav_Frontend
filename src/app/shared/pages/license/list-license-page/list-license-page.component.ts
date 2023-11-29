import { Component } from '@angular/core';
import { License } from '../../../interfaces/ms-business/drivers.interface';
import { Router } from '@angular/router';
import { LicenseService } from '../../../services/ms-business/license.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-list-license-page',
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
    this.listLicense();
  }

  listLicense(): void {
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

  // onDelete(id: string): void {
  //   Swal.fire({
  //     cancelButtonColor: '#B2B2B2',
  //     cancelButtonText: 'No, cancelar',
  //     color: '#0F0F0F',
  //     confirmButtonColor: '#0F0F0F',
  //     confirmButtonText: 'Si, estoy seguro',
  //     icon: 'info',
  //     iconColor: '#0F0F0F',
  //     showCancelButton: true,
  //     text: `Deseas eliminar el perfil con id ${id}`,
  //     title: '¿Estás seguro?',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.licenseService.destroy(id).subscribe({
  //         next: (response) => {
  //           this.isLoading = false;

  //           this.listUserProfiles();

  //           Swal.fire({
  //             color: '#0F0F0F',
  //             confirmButtonColor: '#0F0F0F',
  //             icon: 'success',
  //             iconColor: '#0F0F0F',
  //             title: `${response.message}`,
  //           });
  //         },
  //         error: (message) => {
  //           this.isLoading = false;

  //           this.swalService.error(message);
  //         },
  //       });
  //     }
  //   });
  // }

  navegateTo(path: string): void {
    this.router.navigateByUrl(`${path}`);
  }
}
