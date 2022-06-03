import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { AuthService } from "../services/auth.service";
  
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
      private authService: AuthService,
      private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
      if (this.authService.getUserrole() !== "admin") {
        this.router.navigate(['/requests']);
    }
    return (this.authService.getUserrole() === "admin");
  }
  
}
