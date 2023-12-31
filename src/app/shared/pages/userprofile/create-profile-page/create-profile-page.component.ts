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
import { UserProfileService } from '../../../services/ms-security/user-profile.service';
import { UserService } from '../../../services/ms-security/user.service';
import { SwalService } from '../../../services/swal.service';
import { ValidatorsService } from '../../../services/validators.service';

import { DataUserProfile } from '../../../interfaces/ms-security/users-profile.interface';

interface Color {
  name: string;
  color: string;
}

@Component({
  selector: 'shared-create-profile-page',
  templateUrl: './create-profile-page.component.html',
  styles: ``,
})
export class CreateProfilePageComponent implements OnInit {
  public isLoading: boolean = false;
  public createMode: boolean = true;
  public profilephoto: string =
    'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png';
  public backgroundColor: string = '';
  public colors: Color[] = [
    { name: 'gris', color: 'bg-gray' },
    { name: 'naranja', color: 'bg-orange-700' },
    { name: 'negro', color: 'bg-black' },
    { name: 'verde', color: 'bg-green-700' },
  ];
  public form: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    profilePhoto: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    backgroundImage: new FormControl('', [Validators.required]),
    numberPhone: new FormControl('', [Validators.required]),
  });
  public max: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private userProfileService: UserProfileService,
    private validatorsService: ValidatorsService,
    private swalService: SwalService,
  ) {
    this.max = this.currentDate();
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.createMode = false;

      this.userProfileService
        .show(this.route.snapshot.paramMap.get('id')!)
        .subscribe({
          next: (response) => {
            this.profilephoto = response.data.profilePhoto;
            this.backgroundColor = response.data.backgroundImage;

            this.form.reset(response.data);
            this.form.get('birthday')!.setValue(response.data.birthday);
          },
          error: (message) => {
            this.swalService.error(message).then(() => {
              this.goBack();
            });
          },
        });
    }
  }

  currentDate(): string {
    const currentDate = new Date();
    const currentDay = currentDate.getDate().toString().padStart(2, '0');
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const currentYear = currentDate.getFullYear();

    return `${currentYear}-${currentMonth}-${currentDay}`;
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

  changePhotoProfile(txtInput: string): void {
    if (txtInput.length === 0) {
      this.profilephoto =
        'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png';
      return;
    }

    this.profilephoto = txtInput;
  }

  changeBackgroundColor(txtInput: string): void {
    if (txtInput.length === 0) {
      this.backgroundColor = '';
      return;
    }

    this.backgroundColor = txtInput;
  }

  onCreate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const data: DataUserProfile = {
      name: this.form.controls['name'].value,
      lastName: this.form.controls['lastName'].value,
      profilePhoto: this.form.controls['profilePhoto'].value,
      birthday: this.form.controls['birthday'].value,
      backgroundImage: this.form.controls['backgroundImage'].value,
      numberPhone: this.form.controls['numberPhone'].value,
      status: 0,
    };

    this.userProfileService.store(data).subscribe({
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

    const data: DataUserProfile = {
      name: this.form.controls['name'].value,
      lastName: this.form.controls['lastName'].value,
      profilePhoto: this.form.controls['profilePhoto'].value,
      birthday: this.form.controls['birthday'].value,
      backgroundImage: this.form.controls['backgroundImage'].value,
      numberPhone: this.form.controls['numberPhone'].value,
      status: 0,
    };

    this.userProfileService
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
    this.router.navigate(['admin/list-user-profiles']);
  }
}
