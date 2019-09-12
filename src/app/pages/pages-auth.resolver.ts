import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class PagesAuthResolver implements Resolve<boolean> {
    // It implements Resolver interface in order to cause 
    //  the component wait to render until the authentication data is retrieved.
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.userService.isAuthenticated.pipe(take(1));
    }
}