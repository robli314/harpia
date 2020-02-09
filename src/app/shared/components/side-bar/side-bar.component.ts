import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { MenuGroup } from "src/app/models/menu-group.model";
import { SidenavService } from "src/app/services/sidebar.service";

@Component({
  selector: "hp-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"]
})
export class SideBarComponent implements OnInit, AfterViewInit {
  @ViewChild("navigationSidenav")
  public sidenav: MatSidenav;

  @Input()
  menuGroups: MenuGroup[];

  @Input()
  id: string;

  constructor(private _sidenavService: SidenavService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this._sidenavService.add(this.id, this.sidenav);
  }
}
