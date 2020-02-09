import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() {}

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
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("jwtToken");

    // set authorization token
    if (token) {
      request = request.clone({
        headers: request.headers.set("Authorization", token)
      });
    }

    // set Content-Type
    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json")
      });
    }

    // set Accept
    request = request.clone({
      headers: request.headers.set("Accept", "application/json")
    });

    return next.handle(request);
  }
}
