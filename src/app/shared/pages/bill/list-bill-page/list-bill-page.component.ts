import { Component } from '@angular/core';
import { Bill } from '../../../interfaces/ms-business/bill.interface';
import { Router } from '@angular/router';
import { BillService } from '../../../services/ms-business/bill.service';
import { SwalService } from '../../../services/swal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'shared-list-bill-page',
  templateUrl: './list-bill-page.component.html',
  styles: ``,
})
export class ListBillPageComponent {
  public isLoading: boolean = false;
  public bills?: Bill[] = [];

  constructor(
    private router: Router,
    private billService: BillService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.listBill();
  }

  listBill(): void {
    this.billService.index().subscribe({
      next: (response) => {
        this.isLoading = false;

        this.bills = response.data.data;
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
      text: `Deseas eliminar la factura con id ${id}`,
      title: '¿Estás seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.billService.destroy(id).subscribe({
          next: (response) => {
            this.isLoading = false;

            this.listBill();

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
