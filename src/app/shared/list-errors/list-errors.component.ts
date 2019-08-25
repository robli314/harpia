import { Component, Input, OnInit } from '@angular/core';
import { Errors } from 'src/app/models/errors.model';

@Component({
  selector: 'hp-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss']
})
export class ListErrorsComponent implements OnInit {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(key => `${key} ${errorList.errors[key]}`);
  }

  get errorList(): Array<string> { return this.formattedErrors; }

  constructor() { }

  ngOnInit(): void {
  }

}
