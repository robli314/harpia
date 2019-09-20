import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(public _userService: UserService, public router: Router) { }
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._userService.isAuthenticated.pipe(map((isAuth) => {
            if (!isAuth) {
                this.router.navigate(['/login']);
            }
            return isAuth;
        }));
    }
}