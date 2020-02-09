import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { MenuGroup } from "src/app/models/menu-group.model";
import { MenuService } from "src/app/services/menu.service";
import { SidenavService } from "src/app/services/sidebar.service";
import { UserService } from "src/app/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";

@Component({
  selector: "hp-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class DefaultComponent extends BaseComponent
  implements OnInit, OnDestroy {
  menuGroups: MenuGroup[];
  leftSidenavId = "leftSidenav";

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _menuService: MenuService,
    private _sidenavService: SidenavService
  ) {
    super();
    this._menuService
      .getMenuData()
      .pipe(takeUntil(this.$destroyed))
      .subscribe(menuGroups => {
        this.menuGroups = menuGroups;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    super.ngOnDestroy();
    this._sidenavService.remove(this.leftSidenavId);
  }

  onLogout() {
    this._router.navigate(["/login"]);
    this._userService.clearAuthentication();
  }

  toggleSidenav(id: string) {
    this._sidenavService.toggle(id);
  }
}
