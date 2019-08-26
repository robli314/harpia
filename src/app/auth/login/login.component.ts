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
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      this.loginForm = this.buildFormGroup(this.authType);
    });
  }

  login(): void {
    console.log(this.loginForm);
  }

  /**
   * Validation function responsible for validating the insertion of new password, basically the function
   * checks if password and confirmPassword are the same, and return a ValidationErrors accordingly.
   * @param {FormGroup} group - to be validated.
   * @returns {ValidationErrors} - validation error result.
   * @memberof LoginComponent
   */
  checkPasswords(group: FormGroup): ValidationErrors {
    let password = group.get('password').value;;
    let confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }

  /**
   * Function responsible for building and returning a FormGroup based on authType.
   * @param {String} authType - authentication type.
   * @returns {FormGroup} - form group result.
   * @memberof LoginComponent
   */
  buildFormGroup(authType: String): FormGroup {

    let formGroup: FormGroup;

    switch (authType) {
      case 'register': {
        formGroup = this.fb.group({
          'username': new FormControl('', Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'passwordInfo': this.fb.group({
            'password': new FormControl('', Validators.required),
            'confirmPassword': new FormControl('')
          }, { validators: this.checkPasswords })
        });
        break;
      } default: {
        // we do not need email and confirmPassword in case of /login
        formGroup = this.loginForm = this.fb.group({
          'username': new FormControl('', Validators.required),
          'passwordInfo': this.fb.group({
            'password': new FormControl('', Validators.required),
          })
        });
      }
    }
    return formGroup;
  }
}
