import { Component, Injector } from '@angular/core';
import { PagesBaseComponent } from '../pages-base.component';

@Component({
  selector: 'hp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends PagesBaseComponent {

  constructor(injector: Injector) {
    super(injector);
  }

}
