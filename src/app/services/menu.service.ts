import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MenuGroup } from "../models/menu-group.model";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  private _menuDataJsonUrl = "assets/data/menu.json";

  constructor(private _http: HttpClient) {}

  public getMenuData(): Observable<MenuGroup[]> {
    return this._http.get<MenuGroup[]>(this._menuDataJsonUrl);
  }
}
