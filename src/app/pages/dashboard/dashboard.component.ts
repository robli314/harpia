import { Component, Injector, OnInit } from '@angular/core';
import { PagesBaseComponent } from '../pages-base.component';

@Component({
  selector: 'hp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends PagesBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

}
