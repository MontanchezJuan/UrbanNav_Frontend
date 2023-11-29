import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ServiceService } from '../../../services/ms-business/service.service';
import { SwalService } from '../../../services/swal.service';
import { Service } from '../../../interfaces/ms-business/service.interface';

@Component({
  selector: 'app-list-service-page',
  templateUrl: './list-service-page.component.html',
  styles: ``,
})
export class ListServicePageComponent implements OnInit {
  public isLoading: boolean = false;
  public services?: Service[] = [];

  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.listServices();
  }

  listServices(): void {
    this.serviceService.index().subscribe({
      next: (response) => {
        this.isLoading = false;

        this.services = response.data.data;
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
      text: `Deseas eliminar el servicio con id ${id}`,
      title: '¿Estás seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.destroy(id).subscribe({
          next: (response) => {
            this.isLoading = false;

            this.listServices();

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
