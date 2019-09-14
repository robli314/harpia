import { Component, Injector, OnInit } from '@angular/core';
import { PagesBaseComponent } from '../pages-base.component';

@Component({
  selector: 'hp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends PagesBaseComponent implements OnInit {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.checkAuthentication();
  }

}
