import { Injectable } from '@angular/core';

import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SwalService {
  private color: string = '#0F0F0F';

  error(message: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      color: this.color,
      confirmButtonColor: this.color,
      iconColor: this.color,
      title: 'Error',
      text: message,
      icon: 'error',
    });
  }
}
