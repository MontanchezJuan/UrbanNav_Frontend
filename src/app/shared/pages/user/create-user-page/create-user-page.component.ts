import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { CreditCardService } from '../../../services/ms-security/credit-card.service';
import { RoleService } from '../../../services/ms-security/role.service';
import { UserProfileService } from '../../../services/ms-security/user-profile.service';
import { UserService } from '../../../services/ms-security/user.service';
import { SwalService } from '../../../services/swal.service';
import { ValidatorsService } from '../../../services/validators.service';

import { CreditCard } from '../../../interfaces/ms-security/credit-card.interface';
import { Role } from '../../../interfaces/ms-security/role.interface';
import {
  User,
  UserData,
} from '../../../interfaces/ms-security/users.interface';
import { UserProfile } from '../../../interfaces/ms-security/users-profile.interface';

// interface Status {
//   name: string;
//   value: number;
// }

@Component({
  selector: 'shared-create-user-page',
  templateUrl: './create-user-page.component.html',
  styles: ``,
})
export class CreateUserPageComponent implements OnInit {
  public isLoading: boolean = false;
  public createMode: boolean = true;
  // public status: Status[] = [
  //   { name: 'creado', value: 0 },
  //   { name: 'eliminado', value: 1 },
  //   { name: 'bloqueado', value: 2 },
  // ];
  public roles: Role[] = [];
  public creditCards: CreditCard[] = [];
  public userProfiles: UserProfile[] = [];
  public currentUser?: User;
  public form: FormGroup = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.validatorsService.emailPattern),
    ]),
    password: new FormControl('', [Validators.required]),
    // status: new FormControl<number>(0, [Validators.required]),
    role: new FormControl(''),
    userProfile: new FormControl(''),
    creditCards: new FormControl(''),
  });

  constructor(
    private creditCardsService: CreditCardService,
    private fb: FormBuilder,
    private profilesService: UserProfileService,
    private rolesService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private validatorsService: ValidatorsService,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    // TODO traer los roles
    this.rolesService.index().subscribe({
      next: (response) => {
        this.roles = response.data;
      },
      error: (message) => {
        this.swalService.error(message);
      },
    });

    // TODO traer los perfiles
    this.profilesService.index().subscribe({
      next: (response) => {
        this.userProfiles = response.data;
      },
      error: (message) => {
        this.swalService.error(message);
      },
    });

    // TODO traer los tarjetas
    this.creditCardsService.index().subscribe({
      next: (response) => {
        this.creditCards = response.data;
      },
      error: (message) => {
        this.swalService.error(message);
      },
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.createMode = false;

      this.userService.show(this.route.snapshot.paramMap.get('id')!).subscribe({
        next: (response) => {
          this.currentUser = response.data;

          this.form.reset(response.data);

          this.form.get('role')!.setValue(response.data.role._id);
          this.form
            .get('userProfile')!
            .setValue(response.data.userProfile?._id);
          // this.form.get('status')!.setValue(response.data.status);
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

        case 'pattern':
          return `Ingrese un email valido`;
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

    const data: UserData = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      role: this.roles.find(
        (role) => role._id === this.form.controls['role'].value,
      ),
      creditCards: this.creditCards.find(
        (card) => card._id === this.form.controls['creditCards'].value,
      ),
      userProfile: this.userProfiles.find(
        (profile) => profile._id === this.form.controls['userProfile'].value,
      ),
      status: 0,
    };

    this.userService.store(data).subscribe({
      next: (response) => {
        Swal.fire({
          color: '#0F0F0F',
          confirmButtonColor: '#0F0F0F',
          icon: 'success',
          iconColor: '#0F0F0F',
          title: `${response.message}`,
        }).then(() => {
          this.isLoading = false;
          if (data.role) {
            this.isLoading = true;
            this.userService
              .matchRole(response.data._id, data.role._id)
              .subscribe({
                next: (response) => {
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
            this.isLoading = false;
          }
          if (data.userProfile) {
            this.isLoading = true;
            this.userService
              .matchUserProfile(data.userProfile._id, response.data._id)
              .subscribe({
                next: (response) => {
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
            this.isLoading = false;
          }

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

  onUpdate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const data: UserData = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      role: this.roles.find(
        (role) => role._id === this.form.controls['role'].value,
      ),
      creditCards: this.creditCards.find(
        (card) => card._id === this.form.controls['creditCards'].value,
      ),
      userProfile: this.userProfiles.find(
        (profile) => profile._id === this.form.controls['userProfile'].value,
      ),
      status: 0,
    };

    this.userService
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
            if (data.role && data.role._id != response.data.role._id) {
              this.isLoading = true;
              this.userService
                .matchRole(response.data._id, data.role._id)
                .subscribe({
                  next: (response) => {
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
              this.isLoading = false;
            }
            if (
              data.userProfile &&
              data.userProfile._id != response.data.userProfile?._id
            ) {
              this.isLoading = true;
              this.userService
                .matchUserProfile(data.userProfile._id, response.data._id)
                .subscribe({
                  next: (response) => {
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
              this.isLoading = false;
            }

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
    this.router.navigate(['admin/list-users']);
  }
}
