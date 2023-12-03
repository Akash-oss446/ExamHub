import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const adminGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  if(authService.isLoggedin() && authService.getUserRole()=='Admin')
  {
     return true;
  }
  router.navigate(['login']);
  return false;
};
