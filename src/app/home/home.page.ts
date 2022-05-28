import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public userId = null;

  constructor(
      public router: Router,
      public authService: AuthService,
  ) {}

  goToCreatePaste() {
    this.router.navigate(['/paste/create/']);
  }

  goViewMyPastes() {
    this.userId = this.authService.getUserId();
    this.router.navigate(['/user/details/paste-list/' + this.userId.id]);
  }

  goViewPasteList() {
    this.router.navigate(['/paste/list/']);
  }

  goViewUserList() {
    this.router.navigate(['/user/list/']);
  }

}
