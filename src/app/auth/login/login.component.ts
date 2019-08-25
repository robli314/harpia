import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomErrorStateMatcher } from 'src/app/helpers/custom-error-state.matcher';
import { Errors } from 'src/app/models/errors.model';

@Component({
  selector: 'hp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: String = '';
  authType: String = '';
  loginForm: FormGroup;
  matcher = new CustomErrorStateMatcher;
  errors: Errors = { errors: {} };

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder) {

    // default formGroup /register
    this.loginForm = this.fb.group({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'passwordInfo': this.fb.group({
        'password': new FormControl('', Validators.required),
        'confirmPassword': new FormControl('', Validators.required)
      }, { validators: this.checkPasswords })
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;

      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';

      // we do not need email and confirmPassword in case of /login
      if (this.authType === 'login') {
        this.loginForm = this.fb.group({
          'username': new FormControl('', Validators.required),
          'passwordInfo': this.fb.group({
            'password': new FormControl('', Validators.required),
          })
        });
      }
    });
  }

  login(): void {
    console.log(this.loginForm);
  }

  checkPasswords(group: FormGroup): ValidationErrors {
    let password = group.get('password').value;;
    let confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }
}
