import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PagesBaseComponent } from '../pages-base.component';

@Component({
  selector: 'hp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends PagesBaseComponent implements OnInit {

  constructor(public userService: UserService, public router: Router) {
    super(userService, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
