import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'hp-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  selectedLanguage: Language;
  languages: Observable<Language[]>;

  constructor(private _configurationService: ConfigurationService, private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.languages = this._configurationService.languages;

    this._configurationService.getSelectedLanguage().subscribe(selectedLanguage => {
      this.selectedLanguage = selectedLanguage;
    });
  }

  onChangeLanguage(language: Language) {
    this._configurationService.setLanguage(language);
  }

  onLogout() {
    this._router.navigate(['/login']);
    this._userService.clearAuthentication();
  }

}
