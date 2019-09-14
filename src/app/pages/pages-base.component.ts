import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

/**
 * 
 *  This component shares logic to be used inside of all pages.
 * 
 * @export
 * @class PagesBaseComponent
 */
export class PagesBaseComponent {

    constructor(private _injector: Injector) { }

    public checkAuthentication(): void {
        this._injector.get(UserService).isAuthenticated.subscribe(
            (authenticated) => {
                if (!authenticated) {
                    this._injector.get(Router).navigateByUrl('/login');
                }
            }
        );
    }

}
