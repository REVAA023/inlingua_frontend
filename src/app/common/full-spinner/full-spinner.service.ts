import { Injectable } from '@angular/core';
import { SpinnerComponent, } from './full-spinner.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { defer, NEVER, Observable, Subject } from 'rxjs';
import { scan, map, finalize, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FullSpinnerService {
  private spinnerTopRefLight = this.cdkSpinnerCreateLight();
  empty: Subject<boolean> = new Subject();
  constructor(private overlay: Overlay) {
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
          // tslint:disable-next-line: no-unused-expression
          this.spinnerTopRefLight.hasAttached()
            ? this.stopSpinner()
            : null;
        }
      });
  }

  private cdkSpinnerCreateLight() {

    return this.overlay.create({
      width: '100%',
      hasBackdrop: true,
      backdropClass: 'no-backdrop',
      // panelClass: this.router.url === '/login' ? 'no-panel-pad' : '',
      positionStrategy: this.overlay.position().global(),
      // .centerHorizontally()
      // .centerVertically()
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
