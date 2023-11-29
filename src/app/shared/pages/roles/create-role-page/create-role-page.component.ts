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
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { PermissionService } from '../../../services/ms-security/permission.service';
import { Permission } from '../../../interfaces/ms-security/permission.interface';
import { RoleService } from '../../../services/ms-security/role.service';
import { SwalService } from '../../../services/swal.service';
import { ValidatorsService } from '../../../services/validators.service';
import { DataRole } from '../../../interfaces/ms-security/role.interface';

@Component({
  selector: 'shared-create-role-page',
  templateUrl: './create-role-page.component.html',
  styles: ``,
})
export class CreateRolePageComponent implements OnInit {
  public isLoading: boolean = false;
  public createMode: boolean = true;
  public totalPermissions: Permission[] = [];
  public currentRole: any;
  public rolePermissions: Permission[] | null = [];

  public form: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    // status: new FormControl<number>(0, [Validators.required]),
    permissions: this.fb.array([]),
  });
  permissionControls: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rolesService: RoleService,
    private validatorsService: ValidatorsService,
    private swalService: SwalService,
    private permissionService: PermissionService,
  ) {}

  checkedPermissions(): Permission[] {
    // Obtén el FormArray 'permissions'
    const permissionsArray = this.form.get('permissions') as FormArray;

    // Obtén todos los elementos marcados
    const permisosSeleccionados = permissionsArray.controls
      .map((control, index) => ({ index, value: control.value }))
      .filter((item) => item.value === true);

    let permissions: Permission[] = [];
    this.totalPermissions.forEach((permission, index) => {
      if (index in permisosSeleccionados) {
        permissions.push(permission);
      }
    });
    return permissions;
  }
  unCheckedPermissions(): Permission[] {
    // Obtén el FormArray 'permissions'
    const permissionsArray = this.form.get('permissions') as FormArray;
    // Obtén todos los elementos marcados
    const permisosNoSeleccionados = permissionsArray.controls
      .map((control, index) => ({ index, value: control.value }))
      .filter((item) => item.value === false);
    let permissions: Permission[] = [];
    this.totalPermissions.forEach((permission, index) => {
      if (index in permisosNoSeleccionados) {
        permissions.push(permission);
      }
    });
    return permissions;
  }
  hasPermission(permission: Permission): boolean {
    let response: boolean = false;
    if (this.rolePermissions) {
      this.rolePermissions.forEach((rolePermission) => {
        if (rolePermission._id == permission._id) {
          response = true;
        }
      });
    } else {
      response = false;
    }
    return response;
  }

  initPermissions(rolePermissions: Permission[] | null): void {
    if (rolePermissions != null) {
      this.permissionControls = this.totalPermissions.map((permission) =>
        this.fb.control(this.hasPermission(permission)),
      );
    } else {
      this.permissionControls = this.totalPermissions.map((permission) =>
        this.fb.control(false),
      );
    }
    this.form.setControl('permissions', this.fb.array(this.permissionControls));
  }

  ngOnInit(): void {
    this.permissionService.index().subscribe({
      next: (response) => {
        this.totalPermissions = response.data;
        this.initPermissions(null);
        if (this.route.snapshot.paramMap.get('id')) {
          this.createMode = false;

          this.rolesService
            .show(this.route.snapshot.paramMap.get('id')!)
            .subscribe({
              next: (response) => {
                this.currentRole = response.data;
                this.rolePermissions = response.data.totalPermissions;
                this.form.reset(response.data);
                this.form.get('name')!.setValue(response.data.name);
                this.form
                  .get('description')!
                  .setValue(response.data.description);
                this.initPermissions(this.rolePermissions);

                // this.form.get('status')!.setValue(response.data.status);
              },
              error: (message) => {
                this.swalService.error(message).then(() => {
                  this.goBack();
                });
              },
            });
        }
      },
      error: (message) => {
        this.swalService.error(message);
      },
    });
  }
  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.form, field);
  }
  matching(permission: Permission, toMatch: boolean) {
    if (this.createMode == true) {
      return;
    }
    this.isLoading = true;
    if (toMatch == true) {
      this.rolesService
        .matchPermission(this.currentRole._id, permission._id)
        .subscribe({
          next: (response) => {
            console.log(response.message, response.data);
          },
          error: (message) => {
            this.isLoading = false;

            this.swalService.error(message);
          },
        });
    } else {
      this.rolesService
        .unMatchPermission(this.currentRole._id, permission._id)
        .subscribe({
          next: (response) => {
            console.log(response.message, response.data);
          },
          error: (message) => {
            this.isLoading = false;

            this.swalService.error(message);
          },
        });
    }
    this.isLoading = false;
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

    const data: DataRole = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      status: 0,
    };
    const checkedPermissions: Permission[] = this.checkedPermissions();

    this.rolesService.store(data).subscribe({
      next: (response) => {
        Swal.fire({
          color: '#0F0F0F',
          confirmButtonColor: '#0F0F0F',
          icon: 'success',
          iconColor: '#0F0F0F',
          title: `${response.message}`,
        }).then(() => {
          this.isLoading = false;
          if (checkedPermissions.length > 0) {
            this.isLoading = true;
            from(checkedPermissions)
              .pipe(
                concatMap((permission) =>
                  this.rolesService.matchPermission(
                    response.data._id,
                    permission._id,
                  ),
                ),
              )
              .subscribe({
                next: (responsed) => {
                  console.log(responsed.message, responsed.data);
                  this.isLoading = false;
                },
                error: (message) => {
                  this.isLoading = false;

                  this.swalService.error(message);
                },
              });
          }

          this.goBack();

          this.form.reset({
            name: '',
            description: '',
            status: '',
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
    const data: DataRole = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      status: 0,
    };
    this.rolesService
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
              email: '',
              password: '',
              status: '',
              role: '',
              creditCards: '',
              userProfile: '',
            });
          });
        },
        error: (message) => {
          this.isLoading = false;

          this.swalService.error(message);
        },
      });
  }

  goBack(): void {
    this.router.navigate(['admin/list-roles']);
  }
}
