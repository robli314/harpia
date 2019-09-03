import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationMessageService } from '../services/notification-dialog.service';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private notificationMessageService: NotificationMessageService) { }

    /**
     * The JWT token is retrieved from the localStorage, in case there is one valid token, then token is 
     * inserted in the request headers.
     * 
     * The Content-Type and Accept are set to 'application/json'.
     *
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     * @memberof TokenInterceptor
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                let reason = error && error.error.message instanceof Object ?
                    error.error.message.errmsg : error.error.message;
                data = {
                    message: reason,
                    status: error.status,
                    type: 'error'
                };
                this.notificationMessageService.openDialog(data);
                return throwError(error);
            }));
    }

}

