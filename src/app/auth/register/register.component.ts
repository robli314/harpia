import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.title = 'Sign Up';
    this.registerForm = this.fb.group({
      'username': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'passwordInfo': this.fb.group({
        'password': new FormControl('', Validators.required),
        'confirmPassword': new FormControl('')
      }, { validators: this.checkPasswords })
    });
  }

  onSubmitForm(): void {
    this.userService.register({
      'username': this.registerForm.value.username,
      'name': this.registerForm.value.name,
      'lastName': this.registerForm.value.lastName,
      'password': this.registerForm.value.passwordInfo.password,
      'email': this.registerForm.value.email
    }).pipe(map(user => {
      return this.userService.authenticate(user);
    })).subscribe(data => {
      this.router.navigateByUrl('/');
    });
  }

  /**
   * Validation function responsible for validating the insertion of new password, basically the function
   * checks if password and confirmPassword are the same, and return a ValidationErrors object accordingly.
   * @param {FormGroup} - FormGroup to to be validated.
   * @returns {ValidationErrors} - The validation error object.
   * @memberof RegisterComponent
   */
  checkPasswords(group: FormGroup): ValidationErrors {
    let password = group.get('password').value;;
    let confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }
}
