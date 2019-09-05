import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomErrorStateMatcher } from 'src/app/helpers/custom-error-state.matcher';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'hp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: String = '';
  loginForm: FormGroup;
  matcher = new CustomErrorStateMatcher;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.title = 'Sign In';
    this.loginForm = this.fb.group({
      'username': new FormControl('', Validators.required),
      'passwordInfo': this.fb.group({
        'password': new FormControl('', Validators.required),
      })
    });
  }

  onSubmitForm(): void {

    throw Error('Test');

    this.userService.authenticate({
      'username': this.loginForm.value.username,
      'password': this.loginForm.value.passwordInfo.password,
      'email': this.loginForm.value.email
    }).subscribe(user => {
      this.router.navigateByUrl('/');
    });
  }
}
