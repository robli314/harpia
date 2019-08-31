import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }
    /**
     * The JWT token is retrieved from the localStorage, in case there is one valid token, then token is 
     * inserted in the request headers.
     *
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     * @memberof TokenInterceptor
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = localStorage.getItem('jwtToken');

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
        }
        return next.handle(request);
    }
}