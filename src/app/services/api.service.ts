import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConfigService } from "./app-config.service";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this._http
      .get(`${AppConfigService.settings.apiServer.url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this._http
      .put(
        `${AppConfigService.settings.apiServer.url}${path}`,
        JSON.stringify(body)
      )
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this._http
      .post(
        `${AppConfigService.settings.apiServer.url}${path}`,
        JSON.stringify(body)
      )
      .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this._http
      .delete(`${AppConfigService.settings.apiServer.url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
