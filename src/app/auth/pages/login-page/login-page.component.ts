import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {
  public isLoading: boolean = false;
  public typePassword: string = 'password';
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.validatorsService.emailPattern),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private validatorsService: ValidatorsService,
  ) {}

  changeTypePassword(): void {
    this.typePassword = 'password';
  }

  changeTypeText(): void {
    this.typePassword = 'text';
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
          return 'Ingresa un email válido';
      }
    }

    return '';
  }

  onLogin(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService.login({ ...this.form.value }).subscribe({
      next: () => {
        this.authService.checkAuthentication().subscribe({
          next: () => {
            const redirectTo = this.authService.redirectToAccount();

            this.router.navigate([redirectTo]);

            this.isLoading = false;

            this.form.reset({ email: '', password: '' });
          },
          error: (message) => {
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
      },
      error: (message) => {
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
}
