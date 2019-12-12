import { Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { LogService } from './services/log.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  constructor(private _userService: UserService, private _logService: LogService,
    @Inject(LOCALE_ID) private _locale: string,
    @Inject(PLATFORM_ID) private _platformId: object) {
    this._logService.debug('Locale', this._locale);
    this._logService.debug('PlatformId', this._platformId);
  }

  ngOnInit() {
    this.isAuthenticated = this._userService.isAuthenticated;
  }
}
