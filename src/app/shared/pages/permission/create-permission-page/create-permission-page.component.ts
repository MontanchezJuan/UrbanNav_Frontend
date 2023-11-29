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

import { PermissionService } from '../../../services/ms-security/permission.service';
import { Permission } from '../../../interfaces/ms-security/permission.interface';
import { SwalService } from '../../../services/swal.service';
import { ValidatorsService } from '../../../services/validators.service';

import { DataPermission } from '../../../interfaces/ms-security/permission.interface';

@Component({
  selector: 'shared-create-permission-page',
  templateUrl: './create-permission-page.component.html',
  styles: ``,
})
export class CreatePermissionPageComponent implements OnInit {
  public isLoading: boolean = false;
  public createMode: boolean = true;
  public methods = ['GET', 'POST', 'PUT', 'DELETE'];
  public form: FormGroup = this.fb.group({
    route: new FormControl('', [Validators.required]),
    method: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    // status: new FormControl<number>(0, [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private validatorsService: ValidatorsService,
    private swalService: SwalService,
    private permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.createMode = false;

      this.permissionService
        .show(this.route.snapshot.paramMap.get('id')!)
        .subscribe({
          next: (response) => {
            this.form.reset(response.data);
            this.form.get('route')!.setValue(response.data.route);
            this.form.get('method')!.setValue(response.data.method);
            this.form.get('description')!.setValue(response.data.description);
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

    const data: DataPermission = {
      route: this.form.controls['route'].value,
      method: this.form.controls['method'].value,
      description: this.form.controls['description'].value,
      status: 0,
    };

    this.permissionService.store(data).subscribe({
      next: (response) => {
        Swal.fire({
          color: '#0F0F0F',
          confirmButtonColor: '#0F0F0F',
          icon: 'success',
          iconColor: '#0F0F0F',
          title: `${response.message}`,
        }).then(() => {
          this.isLoading = false;

          this.goBack();

          this.form.reset({
            route: '',
            method: '',
            description: '',
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

    const data: DataPermission = {
      route: this.form.controls['route'].value,
      method: this.form.controls['method'].value,
      description: this.form.controls['description'].value,
      status: 0,
    };

    this.permissionService
      .update(data, this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (response) => {
          Swal.fire({
            color: '#0F0F0F',
            confirmButtonColor: '#0F0F0F',
            icon: 'success',
            iconColor: '#0F0F0F',
            title: `${response.message}`,
          }).then(() => {
            this.isLoading = false;

            this.goBack();

            this.form.reset({
              route: '',
              method: '',
              description: '',
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
    this.router.navigate(['admin/list-permissions']);
  }
}
