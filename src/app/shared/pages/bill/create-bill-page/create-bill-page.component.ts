import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../../../auth/services/auth.service';
import { SwalService } from '../../../services/swal.service';
import { ValidatorsService } from '../../../services/validators.service';
import { BillService } from '../../../services/ms-business/bill.service';
import { Bill, BillData } from '../../../interfaces/ms-business/bill.interface';
import { CreditCard } from '../../../interfaces/ms-security/credit-card.interface';
import { CreditCardService } from '../../../services/ms-security/credit-card.service';
import { ServiceService } from '../../../services/ms-business/service.service';
import { Service } from '../../../interfaces/ms-business/service.interface';

@Component({
  selector: 'shared-create-bill-page',
  templateUrl: './create-bill-page.component.html',
  styles: ``,
})
export class CreateBillPageComponent implements OnInit {
  public isLoading: boolean = false;
  public createMode: boolean = true;
  public services?: Service[] = [];
  public cards?: CreditCard[] = [];
  public form: FormGroup = this.fb.group({
    service_id: new FormControl('', [Validators.required]),
    credit_card_id: new FormControl('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private billService: BillService,
    private serviceService: ServiceService,
    private cardService: CreditCardService,
    private validatorsService: ValidatorsService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.cardService.index().subscribe({
      next: (response) => {
        this.cards = response.data;
        this.isLoading = false;
      },
      error: (message) => {
        this.swalService.error(message);
      },
    });

    this.serviceService.index().subscribe({
      next: (response) => {
        this.services = response.data.data;
        this.isLoading = false;
      },
      error: (message) => {
        this.swalService.error(message);
      },
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.createMode = false;

      this.billService.show(this.route.snapshot.paramMap.get('id')!).subscribe({
        next: (response) => {
          this.form.reset(response.data);
        },
        error: (message) => {
          this.swalService.error(message).then(() => {
            this.goBack();
          });
        },
      });
    }
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.form, field);
  }

  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null;

    const errors = this.form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `El campo ${field} es requerido`;
      }
    }

    return '';
  }

  onCreate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const data: BillData = {
      service_id: this.form.controls['name'].value,
      credit_card_id: this.form.controls['lastName'].value,
      status: 0,
    };

    this.billService.store(data).subscribe({
      next: (response) => {
        Swal.fire({
          color: '#0F0F0F',
          confirmButtonColor: '#0F0F0F',
          icon: 'success',
          iconColor: '#0F0F0F',
          title: `${response.mensaje}`,
        }).then(() => {
          this.isLoading = false;

          this.goBack();

          this.form.reset({
            name: '',
            lastName: '',
            profilePhoto: '',
            birthday: '',
            backgroundImage: '',
            numberPhone: '',
          });
        });
      },
      error: (message) => {
        this.isLoading = false;

        this.swalService.error(message);
      },
    });
  }

  onUpdate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const data: BillData = {
      service_id: this.form.controls['service'].value,
      credit_card_id: this.form.controls['credit_card'].value,
      status: 0,
    };

    this.billService
      .update(data, this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (response) => {
          Swal.fire({
            color: '#0F0F0F',
            confirmButtonColor: '#0F0F0F',
            icon: 'success',
            iconColor: '#0F0F0F',
            title: `${response.mensaje}`,
          }).then(() => {
            this.isLoading = false;

            this.goBack();

            this.form.reset({
              name: '',
              lastName: '',
              profilePhoto: '',
              birthday: '',
              backgroundImage: '',
              numberPhone: '',
            });
          });
        },
        error: (message) => {
          this.isLoading = false;

          Swal.fire({
            color: '#0F0F0F',
            confirmButtonColor: '#0F0F0F',
            icon: 'error',
            iconColor: '#0F0F0F',
            title: 'Error',
            text: message,
          });
        },
      });
  }

  goBack(): void {
    this.router.navigate(['admin/list-bills']);
  }
}
