import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { MenuGroup } from "src/app/models/menu-group.model";

@Component({
  selector: "hp-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"]
})
export class SideBarComponent implements OnInit {
  @ViewChild("navigationSidenav")
  public sidenav: MatSidenav;

  @Input()
  menuGroups: MenuGroup[];

  @Input()
  id: string;

  constructor() {}

  ngOnInit() {}
}
