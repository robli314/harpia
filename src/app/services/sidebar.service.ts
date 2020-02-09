import { Injectable } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Injectable({
  providedIn: "root"
})
export class SidenavService {
  private sidenavs: any[] = [];

  addSidenav(id: string, sidenav: MatSidenav) {
    this.sidenavs.push({ id: id, sidenav: sidenav });
  }

  toogle(id: string) {
    let sidenav: MatSidenav = this.sidenavs.find(element => element.id === id)
      .sidenav;
    sidenav.toggle();
  }
}
