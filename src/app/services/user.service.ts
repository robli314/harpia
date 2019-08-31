import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, flatMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private apiService: ApiService,
        private jwtService: JwtService) { }

    /**
     *  It calls the rest service to attempt the authentication (sign in or sign up)
     *  using the credentials passed. It's up to the rest service to decided
     *  if it is a sign in or sign up based on the parameter authType passed.
     * 
     * @param {String} authType - The type of authentication (login or register)
     * @param {*} credentials - The information needed to forward the authentication.
     * @returns {Observable<User>} - The return, an Observable of User.
     * @memberof UserService
     */
    authenticate(authType: String, credentials: any): Observable<User> {
        return this.apiService.post('/auth/local', credentials).pipe(flatMap(data => {
            this.jwtService.saveToken(data.token);
            return this.apiService.get('/api/user/me');
        }));
    }

    /**
     * It set the current user data into the observable, in addition,
     * set the isAuthenticated to true.
     * @param {User} user
     * @memberof UserService
     */
    setAuth(user: User): void {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

}