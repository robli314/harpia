import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'hp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',
      [Validators.required]),
    password: new FormControl('',
      [Validators.required]),
  });

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log(this.loginForm);
  }
}
