import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'shared-card-profile',
  templateUrl: './card-profile.component.html',
  styles: ``,
})
export class CardProfileComponent implements OnInit {
  public profilePhoto: string = '';
  public name: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.profilePhoto = this.authService.currentUser.userProfile?.profilePhoto!;
    this.name = this.authService.currentUser.userProfile?.name!;
  }
}
