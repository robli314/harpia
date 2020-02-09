import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class NoAuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._userService.isAuthenticated.pipe(
      take(1),
      map(isAuth => !isAuth)
    );
  }
}
