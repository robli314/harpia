import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuGroup } from "src/app/models/menu-group.model";
import { MenuService } from "src/app/services/menu.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "hp-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class DefaultComponent implements OnInit, OnDestroy {
  menuGroups: MenuGroup[];

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _menuService: MenuService
  ) {}

  ngOnInit() {
    this._menuService.getMenuData().subscribe(menuGroups => {
      this.menuGroups = menuGroups;
    });
  }

  ngOnDestroy() {}

  onLogout() {
    this._router.navigate(["/login"]);
    this._userService.clearAuthentication();
  }
}
