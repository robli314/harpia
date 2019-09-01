import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomErrorStateMatcher } from 'src/app/helpers/custom-error-state.matcher';
import { Errors } from 'src/app/models/errors.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'hp-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title: String = '';
  authType: String = '';
  authForm: FormGroup;
  matcher = new CustomErrorStateMatcher;
  errors: Errors = { errors: {} };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      this.authForm = this.buildFormGroup(this.authType);
    });
  }

  onSubmitForm(): void {
    if (this.authType === 'login') {
      this.login();
    } else {
      this.register();
    }
  }

  register() {
    this.userService.register({
      'username': this.authForm.value.username,
      'name': this.authForm.value.name,
      'lastName': this.authForm.value.lastName,
      'password': this.authForm.value.passwordInfo.password,
      'email': this.authForm.value.email
    }).subscribe(user => {
      this.router.navigateByUrl('/login');
    },
      err => {
        this.errors = { errors: { 'Error:': err.message } };
      });
  }

  login(): void {
    this.userService.authenticate({
      'username': this.authForm.value.username,
      'password': this.authForm.value.passwordInfo.password,
      'email': this.authForm.value.email
    }).subscribe(user => {
      this.router.navigateByUrl('/');
    },
      err => {
        this.errors = { errors: { 'Error:': err.message } };
      });
  }

  /**
   * Validation function responsible for validating the insertion of new password, basically the function
   * checks if password and confirmPassword are the same, and return a ValidationErrors object accordingly.
   * @param {FormGroup} - FormGroup to to be validated.
   * @returns {ValidationErrors} - The validation error object.
   * @memberof AuthComponent
   */
  checkPasswords(group: FormGroup): ValidationErrors {
    let password = group.get('password').value;;
    let confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }

  /**
   * Function responsible for building and returning a FormGroup based on authType.
   * @param {String} authType - The authentication type.
   * @returns {FormGroup} - The form group result.
   * @memberof AuthComponent
   */
  buildFormGroup(authType: String): FormGroup {

    let formGroup: FormGroup;

    switch (authType) {
      case 'register': {
        formGroup = this.fb.group({
          'username': new FormControl('', Validators.required),
          'name': new FormControl('', Validators.required),
          'lastName': new FormControl('', Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'passwordInfo': this.fb.group({
            'password': new FormControl('', Validators.required),
            'confirmPassword': new FormControl('')
          }, { validators: this.checkPasswords })
        });
        break;
      } default: {
        // remove email and confirmPassword in case of /login page
        formGroup = this.authForm = this.fb.group({
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
