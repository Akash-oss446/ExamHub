import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const normalGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  if(authService.isLoggedin() && authService.getUserRole()=='Normal User')
  {
    return true;
  }
  router.navigate(['login']);
  return false;
};
