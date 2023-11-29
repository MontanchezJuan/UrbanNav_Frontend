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

import { CustomerService } from '../../../services/ms-business/customer.service';
import { SwalService } from '../../../services/swal.service';
import { ValidatorsService } from '../../../services/validators.service';

import { CustomerData } from '../../../interfaces/ms-business/customer.interface';
import { UserService } from '../../../services/ms-security/user.service';
import { User } from '../../../interfaces/ms-security/users.interface';

@Component({
  selector: 'app-create-customer-page',
  templateUrl: './create-customer-page.component.html',
  styles: ``,
})
export class CreateCustomerPageComponent implements OnInit {
  public isLoading: boolean = false;
  public createMode: boolean = true;
  public withoutUsers: boolean = true;
  public users: User[] | null = [];
  public form: FormGroup = this.fb.group({
    user_id: new FormControl('', [Validators.required]),
  });
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private validatorsService: ValidatorsService,
    private swalService: SwalService,
    private customerService: CustomerService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.userService.index().subscribe({
      next: (response) => {
        this.users = response.data;

        this.withoutUsers = false;
        this.isLoading = false;
      },
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.createMode = false;

      this.customerService
        .show(parseInt(this.route.snapshot.paramMap.get('id')!))
        .subscribe({
          next: (response) => {
            this.form.reset(response.data);
            this.form.get('user_id')!.setValue(response.data.user_id);
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

    const data: CustomerData = {
      user_id: this.form.controls['user_id'].value,
      status: 0,
    };

    this.customerService.store(data).subscribe({
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

    const data: CustomerData = {
      user_id: this.form.controls['route'].value,
      status: 0,
    };

    this.customerService
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
    this.router.navigate(['admin/list-customers']);
  }
}
