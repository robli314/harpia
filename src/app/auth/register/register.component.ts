import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CustomErrorStateMatcher } from 'src/app/helpers/custom-error-state.matcher';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'hp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  title: String = '';
  registerForm: FormGroup;
  matcher = new CustomErrorStateMatcher;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _userService: UserService) {
  }

  ngOnInit(): void {
    this.title = 'Sign Up';
    this.registerForm = this._fb.group({
      'username': ['', [Validators.required]],
      'name': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'passwordInfo': this._fb.group({
        'password': ['', [Validators.required]],
        'confirmPassword': ['']
      }, { validators: this.checkPasswords })
    });
  }

  onSubmitForm(): void {
    this._userService.register({
      'username': this.registerForm.value.username,
      'name': this.registerForm.value.name,
      'lastName': this.registerForm.value.lastName,
      'password': this.registerForm.value.passwordInfo.password,
      'email': this.registerForm.value.email
    }).pipe(map(user => {
      return this._userService.authenticate(user);
    })).subscribe(data => {
      this._router.navigateByUrl('/');
    });
  }

  /**
   * Validation function responsible for validating the insertion of new password, basically the function
   * checks if password and confirmPassword are the same, and return a ValidationErrors object accordingly.
   * @param {FormGroup} - FormGroup to be validated.
   * @returns {ValidationErrors} - The map of errors.
   * @memberof RegisterComponent
   */
  checkPasswords(group: FormGroup): ValidationErrors {
    return group.get('password').value === group.get('confirmPassword').value ? null : { notSame: true }
  }
}
