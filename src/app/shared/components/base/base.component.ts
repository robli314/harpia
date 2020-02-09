import { OnDestroy } from "@angular/core";
import { ReplaySubject } from "rxjs";

export abstract class BaseComponent implements OnDestroy {
  $destroyed: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor() {}
  ngOnDestroy() {
    this.$destroyed.next(true);
    this.$destroyed.complete();
  }
}
