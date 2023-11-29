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
import { CreditCardService } from '../../../services/ms-security/credit-card.service';
import { SwalService } from '../../../services/swal.service';
import { ValidatorsService } from '../../../services/validators.service';

import { DataCreditCard } from '../../../interfaces/ms-security/credit-card.interface';

@Component({
  selector: 'shared-create-creditcard-page',
  templateUrl: './create-creditcard-page.component.html',
  styles: ``,
})
export class CreateCreditcardPageComponent implements OnInit {
  public isLoading: boolean = false;
  public createMode: boolean = true;

  public form: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [Validators.required]),
    cardCVV: new FormControl('', [Validators.required]),
    expiryDate: new FormControl('', [Validators.required]),
    balance: new FormControl('', [Validators.required]),
    // status: new FormControl<number>(0, [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private validatorsService: ValidatorsService,
    private swalService: SwalService,
    private creditCardService: CreditCardService,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.createMode = false;

      this.creditCardService
        .show(this.route.snapshot.paramMap.get('id')!)
        .subscribe({
          next: (response) => {
            this.form.reset(response.data);
            this.form.get('name')!.setValue(response.data.name);
            this.form.get('type')!.setValue(response.data.type);
            this.form.get('cardNumber')!.setValue(response.data.cardNumber);
            this.form.get('cardCVV')!.setValue(response.data.cardCVV);
            this.form.get('expiryDate')!.setValue(response.data.expiryDate);
            this.form.get('balance')!.setValue(response.data.balance);
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

    const data: DataCreditCard = {
      name: this.form.controls['name'].value,
      type: this.form.controls['type'].value,
      cardNumber: this.form.controls['cardNumber'].value,
      cardCVV: this.form.controls['cardCVV'].value,
      expiryDate: this.form.controls['expiryDate'].value,
      balance: this.form.controls['balance'].value,
      status: 0,
    };

    this.creditCardService.store(data).subscribe({
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
            type: '',
            cardNumber: '',
            cardCVV: '',
            expiryDate: '',
            balance: '',
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

    const data: DataCreditCard = {
      name: this.form.controls['name'].value,
      type: this.form.controls['type'].value,
      cardNumber: this.form.controls['cardNumber'].value,
      cardCVV: this.form.controls['cardCVV'].value,
      expiryDate: this.form.controls['expiryDate'].value,
      balance: this.form.controls['balance'].value,
      status: 0,
    };

    this.creditCardService
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
              type: '',
              cardNumber: '',
              cardCVV: '',
              expiryDate: '',
              balance: '',
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
    this.router.navigate(['admin/list-credit-cards']);
  }
}
