import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (!this.authService.getJwtToken()) {
        console.log('not authenticated')
        this.router.navigate(['/login']);
    } else {
        console.log('we authenticated')
    }
    return !!this.authService.getJwtToken();
  }

  canLoad() {
    if (!this.authService.getJwtToken()) {
      console.log('YOU MAY NOT LOAD')
      this.router.navigate(['/login']);
    } else {
      console.log('we authenticated')
    }
    return !!this.authService.getJwtToken();
  }
}
