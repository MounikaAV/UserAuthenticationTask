import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  private publicStates: [string, string] = ['/login', '/register'];
  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if user is already logged in, take directly to dashbaord
    if (!this.publicStates.includes(state.url) && this.auth.isAuthenticated()) {
      sessionStorage.setItem('url', state.url);
    }
    if (this.publicStates.includes(state.url) && this.auth.isAuthenticated()) {
      return false;
    }
    // if user is not authenticated, take to login
    if (!this.publicStates.includes(state.url) && !this.auth.isAuthenticated()) {
      sessionStorage.setItem('url', state.url);
      console.error('you need to login to access: ' + state.url);
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

}
