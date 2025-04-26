import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { Subject, map, scan, defer, NEVER, finalize, share } from "rxjs";
import { SpinnerComponent } from "./full-spinner.component";

@Injectable({
  providedIn: 'root',
})
export class FullSpinnerService {
  private spinnerTopRefLight: any;
  empty: Subject<boolean> = new Subject();

  constructor(private overlay: Overlay) {
    this.spinnerTopRefLight = this.cdkSpinnerCreateLight(); // <-- Now overlay is available

    this.empty
      .asObservable()
      .pipe(
        map((val) => (val ? 1 : -1)),
        scan((acc, one) => (acc + one >= 0 ? acc + one : 0), 0)
      )
      .subscribe((res) => {
        if (res === 1) {
          this.showSpinner();
        } else if (res === 0) {
          this.spinnerTopRefLight.hasAttached() ? this.stopSpinner() : null;
        }
      });
  }

  private cdkSpinnerCreateLight() {
    return this.overlay.create({
      width: '100%',
      hasBackdrop: true,
      backdropClass: 'no-backdrop',
      positionStrategy: this.overlay.position().global(),
    });
  }

  private showSpinner() {
    this.spinnerTopRefLight.attach(new ComponentPortal(SpinnerComponent));
  }

  private stopSpinner() {
    this.spinnerTopRefLight.detach();
  }

  public readonly emptySpinner = defer(() => {
    this.showSpinner();
    return NEVER.pipe(
      finalize(() => {
        this.spinnerTopRefLight.hasAttached() ? this.stopSpinner() : null;
      })
    );
  }).pipe(share());
}
