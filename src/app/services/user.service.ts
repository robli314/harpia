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

    private currentUserSubject = new BehaviorSubject<User>({} as User);

    // A value will be emitted only when the current value is different from the last one.
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private apiService: ApiService,
        private jwtService: JwtService) { }

    /**
     * It registers a new user.
     *
     * @param {*} credentials - The information need to forward the register.
     * @returns {Observable<any>}
     * @memberof UserService
     */
    register(credentials: any): Observable<User> {
        return this.apiService.post('/api/user', credentials);
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
        return this.apiService.post('/auth/local', credentials).pipe(flatMap(data => {
            this.jwtService.saveToken(data.token);
            return this.apiService.get('/api/user/me').pipe(map(user => {
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

}