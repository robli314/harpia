import { Injectable } from "@angular/core";
import { SideBarComponent } from "../shared/components/side-bar/side-bar.component";

@Injectable({
  providedIn: "root"
})
export class SideBarService {
  private sideBarComponents: SideBarComponent[] = [];

  /**
   * It adds a new sidebar component to managed by this service.
   * @param id unique identifier
   * @param sideBarComponent component to be added
   *
   * @throws Error in case the id is not unique.
   */
  add(sideBarComponent: SideBarComponent) {
    if (
      this.sideBarComponents.findIndex(
        element => element.id === sideBarComponent.id
      ) !== -1
    ) {
      throw Error(
        "A SideBarComponent with id = " +
          sideBarComponent.id +
          " already exists."
      );
    }

    this.sideBarComponents.push(sideBarComponent);
  }

  /**
   *
   * @param id unique identifier to find the navbar that is suppose to be deleted.
   */
  remove(id: string) {
    const index = this.sideBarComponents.findIndex(
      element => element.id === id
    );
    if (index > -1) {
      this.sideBarComponents.splice(index, 1);
    }
  }

  /**
   * It toggles a sideBarComponent identified by id.
   * @param id unique identify to find the current navbar.
   */
  toggle(id: string) {
    const sideBarComponent: SideBarComponent = this.sideBarComponents.find(
      element => element.id === id
    );

    sideBarComponent.sidenav.toggle();
  }
}
