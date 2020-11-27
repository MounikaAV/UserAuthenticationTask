import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const tokenExists = sessionStorage.getItem('accessToken');
    if (tokenExists && tokenExists != null) {
      // if ((new Date().getTime()) < expiresAt) {
        return true;
    }
    else {
      sessionStorage.clear();
      return false;
      // }
    }
  }
}
