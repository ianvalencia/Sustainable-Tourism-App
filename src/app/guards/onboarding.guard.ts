import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanLoad {
  constructor(private storage: Storage, private router: Router) {}

  canLoad() {
    // this.storage.remove('onboarded');
    return this.storage.get('onboarded').then(res => {
      if (res) {
        this.router.navigate(['/title']);
        return false;
      } else {
        return true;
      }
    });
  }
}
