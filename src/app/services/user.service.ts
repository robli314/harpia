import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, flatMap, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    // the BehaviorSubject stores the current value, so we can get always the latest emitted value
    // the value will be send to the subscribers even they subscribe much later than the value was emitted
    private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

    // A value will be emitted only when the current value is different from the last one.
    public currentUser: Observable<User> = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    // it will be emitting the last one value
    private isAuthenticatedSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    public isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

    constructor(private _apiService: ApiService,
        private jwtService: JwtService) {
        this.isAuthenticatedSubject.next(false);
    }

    /**
     * It registers a new user.
     *
     * @param {*} credentials - The information need to forward the register.
     * @returns {Observable<any>}
     * @memberof UserService
     */
    register(credentials: any): Observable<User> {
        return this._apiService.post('/api/user', credentials);
    }

    /**
     *  It calls the rest service to attempt the authentication
     *  using the credentials passed.
     * 
     * @param {*} credentials - The information needed to forward the authentication.
     * @returns {Observable<User>} - The return, an Observable of User.
     * @memberof UserService
     */
    authenticate(credentials: any): Observable<User> {
        return this._apiService.post('/auth/local', credentials).pipe(flatMap(data => {
            this.jwtService.saveToken(data.token);
            return this._apiService.get('/api/user/me').pipe(map(user => {
                this.setAuth(user);
                return this.getCurrentUser();
            }));
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

    /**
     * It returns the current user logged in.
     * @returns {User} - The user logged in.
     * @memberof UserService
     */
    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    /**
     * It removes the authentication and alerts subscribers.
     *
     * @memberof UserService
     */
    clearAuth(): void {
        this.jwtService.destroyToken();
        this.currentUserSubject.next({} as User);
        this.isAuthenticatedSubject.next(false);
    }

}