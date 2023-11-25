import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { DataLogin } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styles: ``,
})
export class SignupPageComponent {
  public isLoading: boolean = false;
  public typePassword: string = 'password';
  public form: FormGroup = this.fb.group(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo(
          'password',
          'confirmPassword',
        ),
      ],
    },
  );

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
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
          return 'Este campo es requerido';

        case 'pattern':
          return 'Ingresa un email válido';

        case 'notEqual':
          return 'Las contraseñas no coinciden';
      }
    }

    return '';
  }

  onSignup(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const data: DataLogin = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };

    this.authService.login(data).subscribe(() => {
      this.router.navigate(['profile']);

      this.isLoading = false;
    });

    this.form.reset({ email: '', password: '', confirmPassword: '' });
  }
}
