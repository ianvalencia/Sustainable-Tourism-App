import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { UserService } from "../user.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad {
  constructor(
    private storage: Storage,
    private router: Router,
    private user: UserService
  ) {}

  canLoad() {
    // this.storage.remove('onboarded');
    if (!this.user.userIsAuthenticated) {
      console.log("USER IS NOT AUTHENTICATED!");
      this.router.navigateByUrl("/login");
    }
    return this.user.userIsAuthenticated;
  }
}
