import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  static canActivate(arg0: RouterStateSnapshot | ActivatedRouteSnapshot): any {
    throw new Error('Method not implemented.');
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {

    if (this.auth.isLoggedIn()) {
      return true;
    }

    // 🔒 Not logged in → go to login
    this.router.navigate(['/login']);
    return false;
  }
}
