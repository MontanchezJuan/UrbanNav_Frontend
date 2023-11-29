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
  Service,
  ServiceResponse,
} from '../../../interfaces/ms-business/service.interface';

@Component({
  selector: 'app-create-service-page',
  templateUrl: './create-service-page.component.html',
  styles: ``,
})
export class CreateServicePageComponent implements OnInit {
  public isLoading: boolean = false;
  public createMode: boolean = true;
  public services: Service[] | null = [];
  public form: FormGroup = this.fb.group({
    id: new FormControl('', [Validators.required]),
    customer_id: new FormControl('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private validatorsService: ValidatorsService,
    private swalService: SwalService,
    private serviceService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

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

  goBack(): void {
    this.router.navigate(['admin/list-customers']);
  }
}
