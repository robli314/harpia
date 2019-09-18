import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Language } from '../models/language.model';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    constructor() { }

    getLanguages(): Observable<Language[]> {
        return of([
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'pt',
                title: 'Portuguese',
                flag: 'pt'
            }
        ]);
    }

    getSelectedLanguage(): Observable<Language> {
        return of({
            id: 'en',
            title: 'English',
            flag: 'us'
        });
    }
}