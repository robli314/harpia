import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../services/user.service';


@Injectable()
export class PagesAuthResolver implements Resolve<boolean> {
    constructor(
        private _router: Router,
        private _userService: UserService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this._userService.populate().pipe(take(1));
    }
}