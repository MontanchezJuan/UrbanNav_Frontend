import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-logo',
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  @Input()
  public url: string = 'home';

  constructor(private router: Router) {}

  redirectTo() {
    this.router.navigateByUrl(this.url);
  }
}
