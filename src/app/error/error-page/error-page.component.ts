import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'hp-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  routeParams: Params;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParams = this.route.snapshot.queryParams;
  }

}
