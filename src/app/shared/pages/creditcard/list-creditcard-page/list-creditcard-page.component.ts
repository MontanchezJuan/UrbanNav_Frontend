import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { SwalService } from '../../../services/swal.service';
import { CreditCardService } from '../../../services/ms-security/credit-card.service';
import { CreditCard } from '../../../interfaces/ms-security/credit-card.interface';

@Component({
  selector: 'shared-list-creditcard-page',
  templateUrl: './list-creditcard-page.component.html',
  styles: ``,
})
export class ListCreditcardPageComponent implements OnInit {
  public isLoading: boolean = false;
  public creditCards?: CreditCard[] = [];

  constructor(
    private router: Router,
    private creditCardService: CreditCardService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.listCreditCards();
  }

  listCreditCards(): void {
    this.creditCardService.index().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.creditCards = response.data;
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
      text: `Deseas eliminar la tarjeta con id ${id}`,
      title: '¿Estás seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.creditCardService.destroy(id).subscribe({
          next: (response) => {
            this.isLoading = false;

            this.listCreditCards();

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
