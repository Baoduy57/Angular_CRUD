import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log(123);

    const user =
      this.localStorageService.getValue<User | null>('currentUser') || null;
    console.log('null');
    if (!user) {
      this.router.navigate(['/account/login']);
      return of(false);
    }
    return of(true);
  }
}
