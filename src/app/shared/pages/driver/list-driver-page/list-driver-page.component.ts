import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { DriverService } from '../../../services/ms-business/driver.service';
import { SwalService } from '../../../services/swal.service';

import { Driver } from '../../../interfaces/ms-business/drivers.interface';

@Component({
  selector: 'app-list-driver-page',
  templateUrl: './list-driver-page.component.html',
  styles: ``,
})
export class ListDriverPageComponent {
  public isLoading: boolean = false;
  public drivers?: Driver[] = [];

  constructor(
    private router: Router,
    private driverService: DriverService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.listUser();
  }

  listUser(): void {
    this.driverService.index().subscribe({
      next: (response) => {
        this.isLoading = false;

        this.drivers = response.data.data;
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
      text: `Deseas eliminar el usuario con id ${id}`,
      title: '¿Estás seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.driverService.destroy(id).subscribe({
          next: (response) => {
            this.isLoading = false;

            this.listUser();

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
