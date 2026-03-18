import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  static readonly canActivate: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const allowedRoles = route.data['roles'] as string[];
    const userRole = this.auth.getRole();

    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (allowedRoles?.includes(userRole)) {
      return true;
    }

    // 🚨 If role not allowed → redirect properly
    if (userRole === 'EMPLOYEE') {
      this.router.navigate(['/customers']);
    } else {
      this.router.navigate(['/dashboard']);
    }

    return false;
  }
}
