import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'hp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {

  selectedLanguage: Language;
  languages: Observable<Language[]>;

  constructor(private _configurationService: ConfigurationService, private _userService: UserService, private _router: Router) {
  }

  ngOnInit() {
    this.languages = this._configurationService.languages;

    this._configurationService.getSelectedLanguage().subscribe(selectedLanguage => {
      this.selectedLanguage = selectedLanguage;
    });

  }

  getLanguageIcon(flag: string): string {
    return 'assets/images/icons/' + flag + '.png';
  }

  setLanguage(language: Language) {
    this._configurationService.setLanguage(language);
  }

  logout() {
    this._router.navigate(['/login']);
    this._userService.clearAuthentication();
  }
}
