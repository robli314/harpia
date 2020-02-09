import { Injectable } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Injectable({
  providedIn: "root"
})
export class SidenavService {
  private sidenavs: any[] = [];

  /**
   * It adds a new sidnav component to managed by this service.
   * @param id unique identifier
   * @param sidenav component to be added
   *
   * @throws Error in case the id is not unique.
   */
  add(id: string, sidenav: MatSidenav) {
    if (this.sidenavs.findIndex(element => element.id === id) !== -1) {
      throw Error("A sidenav with id = " + id + " already exists.");
    }

    this.sidenavs.push({ id: id, sidenav: sidenav });
  }

  /**
   *
   * @param id unique identifier to find the navbar that is suppose to be deleted.
   */
  remove(id: string) {
    const index = this.sidenavs.findIndex(element => element.id === id);
    if (index > -1) {
      this.sidenavs.splice(index, 1);
    }
  }

  /**
   * It toggles a navbar identified by id.
   * @param id unique identify to find the current navbar.
   */
  toggle(id: string) {
    const sidenav: MatSidenav = this.sidenavs.find(element => element.id === id)
      .sidenav;
    sidenav.toggle();
  }
}
