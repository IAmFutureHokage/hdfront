import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutorGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }
canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | Promise<boolean> {
        if (this.authService.getUserrole() === "admin") {
          this.router.navigate(['/users']);
      }
      return ((this.authService.getUserrole() === "moder")||(this.authService.getUserrole() === "executor"));
    }

}