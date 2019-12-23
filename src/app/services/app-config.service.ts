import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { AppConfig } from '../models/app-config.model';

@Injectable()
export class AppConfigService {
    static settings: AppConfig;

    constructor(private _http: HttpClient) { }

    load() {
        const jsonFile = `assets/config/config.${environment.name}.json`;

        return new Promise<void>((resolve, reject) => {
            this._http.get(jsonFile).toPromise().then((response: AppConfig) => {
                AppConfigService.settings = response;
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            })
        })
    }
}