import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { VehicleService } from '../../../services/ms-business/vehicle.service';
import { SwalService } from '../../../services/swal.service';

import { Vehicle } from '../../../interfaces/ms-business/vehicle.interface';

@Component({
  selector: 'shared-list-vehicle-page',
  templateUrl: './list-vehicle-page.component.html',
  styles: ``,
})
export class ListVehiclePageComponent implements OnInit {
  public isLoading: boolean = false;
  public vehicles?: Vehicle[] = [];

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.listVehicles();
  }

  listVehicles(): void {
    this.vehicleService.index().subscribe({
      next: (response) => {
        this.isLoading = false;

        this.vehicles = response.data.data;
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
  //       this.vehicleService.destroy(id).subscribe({
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
