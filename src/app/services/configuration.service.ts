import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Language } from '../models/language.model';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    private _selectedLanguageSubject: BehaviorSubject<Language>;

    constructor() {
        this._selectedLanguageSubject = new BehaviorSubject({
            id: 'en',
            title: 'English',
            flag: 'us'
        });
    }

    get languages(): Observable<Language[]> {
        return of([
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'pt',
                title: 'Portuguese',
                flag: 'pt-br'
            }
        ]);
    }

    getSelectedLanguage(): Observable<Language> {
        return this._selectedLanguageSubject.asObservable();
    }

    setLanguage(language: Language) {
        this._selectedLanguageSubject.next(language);
    }
}