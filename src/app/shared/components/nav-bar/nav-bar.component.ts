import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "hp-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
