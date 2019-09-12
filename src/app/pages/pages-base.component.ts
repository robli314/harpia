import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export class PagesBaseComponent implements OnInit {

    constructor(private _userService: UserService,
        private _router: Router) { }

    ngOnInit() {
        this._userService.isAuthenticated.subscribe(
            (authenticated) => {
                if (!authenticated) {
                    this._router.navigateByUrl('/login');
                }
            }
        );
    }

}
