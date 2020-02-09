import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomErrorStateMatcher } from "src/app/helpers/custom-error-state.matcher";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "hp-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  title: String = "";
  loginForm: FormGroup;
  matcher = new CustomErrorStateMatcher();

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.title = "Sign In";
    this.loginForm = this._fb.group({
      username: ["", [Validators.required]],
      passwordInfo: this._fb.group({
        password: ["", [Validators.required]]
      })
    });
  }

  onSubmitForm(): void {
    this._userService
      .authenticate({
        username: this.loginForm.value.username,
        password: this.loginForm.value.passwordInfo.password,
        email: this.loginForm.value.email
      })
      .subscribe(user => {
        this._router.navigateByUrl("/");
      });
  }
}
