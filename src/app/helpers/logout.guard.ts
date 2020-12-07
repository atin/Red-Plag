import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private router: Router, private user_service: UserService) {}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const login_status = this.user_service.is_logged_in();
    console.log(login_status);
    // return true;
    if (login_status) {
        window.alert("You have to logout first!")
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    } else {
        return true;
    }
  }
}
