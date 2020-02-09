import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { MenuGroup } from "src/app/models/menu-group.model";
import { MenuService } from "src/app/services/menu.service";
import { SideBarService } from "src/app/services/side-bar.service";
import { UserService } from "src/app/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SideBarComponent } from "src/app/shared/components/side-bar/side-bar.component";

@Component({
  selector: "hp-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class DefaultComponent extends BaseComponent
  implements OnInit, OnDestroy, AfterViewInit {
  menuGroups: MenuGroup[];
  leftSidenavId = "leftSidenav";

  @ViewChild("sideBarLeft")
  public sideBarComponent: SideBarComponent;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _menuService: MenuService,
    private _sideBarService: SideBarService
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
    this._sideBarService.remove(this.leftSidenavId);
  }

  onLogout() {
    this._router.navigate(["/login"]);
    this._userService.clearAuthentication();
  }

  toggleSidenav(id: string) {
    this._sideBarService.toggle(id);
  }

  ngAfterViewInit() {
    this._sideBarService.add(this.sideBarComponent);
  }
}
