import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private _http: HttpClient) { }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this._http.get(`${environment.api_url}${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this._http.put(
            `${environment.api_url}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this._http.post(
            `${environment.api_url}${path}`,
            JSON.stringify(body),
            this.getDefaultHeaders()
        ).pipe(catchError(this.formatErrors));
    }

    delete(path): Observable<any> {
        return this._http.delete(
            `${environment.api_url}${path}`
        ).pipe(catchError(this.formatErrors));
    }

    getDefaultHeaders(): any {
        return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    }
}