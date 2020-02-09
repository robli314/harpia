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
  selector: "hp-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild("navigationSidenav")
  public sidenav: MatSidenav;

  @Input()
  menuGroups: MenuGroup[];

  @Input()
  id: string;

  constructor(private _sidenavService: SidenavService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this._sidenavService.addSidenav(this.id, this.sidenav);
  }
}
