import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  constructor(private _userService: UserService,
    @Inject(LOCALE_ID) private _locale: string) {
    console.log(this._locale)
  }

  ngOnInit() {
    this.isAuthenticated = this._userService.isAuthenticated;
  }
}
