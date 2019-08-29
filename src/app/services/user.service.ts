import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }

    /**
     *  It calls the rest service to attempt the authentication (sign in or sign up)
     *  using the credentials passed. It's up to the rest service to decided
     *  if it is a sign in or sign up based on the parameter authType passed.
     * 
     * @param {String} authType - The type of authentication (login or register)
     * @param {*} credentials - The information needed to forward the authentication.
     * @returns {Observable<User>} - The return, a Observable of User.
     * @memberof UserService
     */
    authenticate(authType: String, credentials: any): Observable<User> {
        return of(null);
    }

}