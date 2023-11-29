import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ServiceService } from '../../../services/ms-business/service.service';
import { SwalService } from '../../../services/swal.service';
import { ValidatorsService } from '../../../services/validators.service';

import {
  DataService,
  Service,
  ServiceResponse,
} from '../../../interfaces/ms-business/service.interface';
import { Trip } from '../../../interfaces/ms-business/trip.interface';
import { Customer } from '../../../interfaces/ms-business/customer.interface';
import { CustomerService } from '../../../services/ms-business/customer.service';
import { TripService } from '../../../services/ms-business/trip.service';

@Component({
  selector: 'app-create-service-page',
  templateUrl: './create-service-page.component.html',
  styles: ``,
})
export class CreateServicePageComponent implements OnInit {
  public isLoading: boolean = false;
  public createMode: boolean = true;
  public services: Service[] | null = [];
  public trips: Trip[] | null = [];
  public customers: Customer[] | null = [];
  public form: FormGroup = this.fb.group({
    customer_id: new FormControl('', [Validators.required]),
    trip_id: new FormControl(''),
    price: new FormControl('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private validatorsService: ValidatorsService,
    private swalService: SwalService,
    private serviceService: ServiceService,
    private customerService: CustomerService,
    private tripService: TripService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.customerService.index().subscribe({
      next: (response) => {
        this.customers = response.data.data;
      },
    });
    this.tripService.index().subscribe({
      next: (response) => {
        this.trips = response.data.data;
      },
    });

    this.serviceService.index().subscribe({
      next: (response) => {
        this.services = response.data.data;
        this.isLoading = false;
      },
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.createMode = false;

      this.serviceService
        .show(this.route.snapshot.paramMap.get('id')!)
        .subscribe({
          next: (response) => {
            this.form.reset(response.data);
            this.form.get('customer_id')!.setValue(response.data.customer_id);
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

    const data: DataService = {
      customer_id: this.form.controls['customer_id'].value,
      // trip_id: this.form.controls['trip_id'].value,
      price: this.form.controls['price'].value,
      status: 0,
    };

    this.serviceService.store(data).subscribe({
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
            customer_id: '',
            trip_id: '',
            price: '',
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

    const data: DataService = {
      customer_id: this.form.controls['customer_id'].value,
      trip_id: this.form.controls['trip_id'].value,
      price: this.form.controls['price'].value,
      status: 0,
    };

    this.serviceService
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
              user_id: '',
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
    this.router.navigate(['admin/list-services']);
  }
}
