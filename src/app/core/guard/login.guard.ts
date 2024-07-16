import { CanActivateFn } from '@angular/router';
import { StorageService } from '../services';
import { Location } from '@angular/common';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const service = inject(StorageService)
  const location = inject(Location)
  if(service.getToken()){
    location.back()
    return false
  }
  return true;
};
