import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(StorageService)
  const router = inject(Router)
  if(!service.getToken()){
    router.navigateByUrl("/auth")
    return false
  }
  return true;
};
