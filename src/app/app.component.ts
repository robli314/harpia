import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
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

  constructor(private _userService: UserService,
    private _logService: LogService,
    @Inject(LOCALE_ID) private _locale: string,
    @Inject(PLATFORM_ID) private _platformId: object,
    @Inject(DOCUMENT) private _doc: Document,
    private _renderer: Renderer2, /* Renderer2 it is an abstraction provided by Angular in the form of a service
    that allows to manipulate elements of the app without having to access the DOM directly. This is
    the recommended approach because it makes easier to develop apps that can be rendered in environment that dont
    have DOM access, for instance on the server, in a web worker or native mobile.*/
  ) {
    this._logService.debug("Locale", this._locale);
    this._logService.debug("PlatformId", this._platformId);

    if (isPlatformBrowser(this._platformId)) {
      this._renderer.setAttribute(this._doc.documentElement, "lang", _locale);
    }
  }

  ngOnInit() {
    this.isAuthenticated = this._userService.isAuthenticated;
  }
}
