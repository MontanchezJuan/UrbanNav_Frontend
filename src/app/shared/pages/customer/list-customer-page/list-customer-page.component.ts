import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { CustomerService } from '../../../services/ms-business/customer.service';
import { SwalService } from '../../../services/swal.service';

import { Customer } from '../../../interfaces/ms-business/customer.interface';

@Component({
  selector: 'shared-list-customer-page',
  templateUrl: './list-customer-page.component.html',
  styles: ``,
})
export class ListCustomerPageComponent {
  public isLoading: boolean = false;
  public customers?: Customer[] = [];

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.listCustomers();
  }

  listCustomers(): void {
    this.customerService.index().subscribe({
      next: (response) => {
        this.isLoading = false;

        this.customers = response.data.data;
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
      text: `Deseas eliminar el cliente con id ${id}`,
      title: '¿Estás seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.destroy(id).subscribe({
          next: (response) => {
            this.isLoading = false;

            this.listCustomers();

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
