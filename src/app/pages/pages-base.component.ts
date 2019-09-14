import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({})
export class PagesBaseComponent implements OnInit {

    constructor(private _injector: Injector) { }

    ngOnInit() {
        this._injector.get(UserService).isAuthenticated.subscribe(
            (authenticated) => {
                if (!authenticated) {
                    this._injector.get(Router).navigateByUrl('/login');
                }
            }
        );
    }

}
