import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      // Validators.minLength(4),
      // Validators.maxLength(10),
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
          return 'Este campo es requerido';

        case 'pattern':
          return 'Ingresa un email válido';

        // case 'minlength':
        //   return 'o';

        // case 'maxlength':
        //   return 'uwu';
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
    // (user) => this.router.navigate(['/'])
    this.authService.login({ ...this.form.value }).subscribe((user) => {
      console.log(user);
      this.isLoading = false;
    });

    // this.form.reset({ email: '', password: '' });
  }
}
