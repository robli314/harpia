import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { LogService } from './services/log.service';
import { UserService } from './services/user.service';
declare const require;
const bowser = require('bowser'); // Javascript library to help detect what browser the user has.

declare const Modernizr; // JavaScript library that detects HTML5 and CSS3 features in the user's browser.

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
    private _snackBar: MatSnackBar
  ) {
    if (isPlatformBrowser(this._platformId)) {
      this._renderer.setAttribute(this._doc.documentElement, 'lang', _locale);
    }

    this.checkBrowser();
  }

  ngOnInit() {
    this.isAuthenticated = this._userService.isAuthenticated;
  }

  private checkBrowser() {
    if (isPlatformBrowser(this._platformId)) {
      if (this.isBrowserValid()) {
        this.checkBrowserFeatures();
      } else {
        this._snackBar.open('Change your browser.', 'OK');
      }
    }
  }

  private checkBrowserFeatures() {
    let supported = true;
    for (const feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) && typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        this._logService.info('Not supported feature: ' + feature);
        supported = false;
      }
    }
    return supported;
  }

  private isBrowserValid() {
    const browser = bowser.getParser(window.navigator.userAgent);
    return browser.satisfies({
      windows: {
        'internet explorer': '>10',
      },
      macos: {
        safari: '>10.1'
      },
      chrome: '>20.1.1432',
      firefox: '>31',
      opera: '>22'
    });
  }
}
