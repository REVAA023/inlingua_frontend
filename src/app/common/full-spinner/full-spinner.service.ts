import { Injectable } from '@angular/core';
import { SpinnerComponent } from './full-spinner.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { defer, NEVER, Observable, Subject } from 'rxjs';
import { scan, map, finalize, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FullSpinnerService {
  private spinnerTopRefLight: any;
  empty: Subject<boolean> = new Subject();

  constructor(private overlay: Overlay) {
    // Initialize the spinner reference lazily when needed.
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
          this.spinnerTopRefLight?.hasAttached() ? this.stopSpinner() : null;
        }
      });
  }

  // Lazily create the overlay instance to avoid undefined issues
  private getOrCreateSpinnerOverlay() {
    if (!this.spinnerTopRefLight) {
      this.spinnerTopRefLight = this.overlay.create({
        width: '100%',
        hasBackdrop: true,
        backdropClass: 'no-backdrop',
        positionStrategy: this.overlay.position().global(),
      });
    }
    return this.spinnerTopRefLight;
  }

  private showSpinner() {
    const overlayRef = this.getOrCreateSpinnerOverlay();
    if (!overlayRef.hasAttached()) {
      overlayRef.attach(new ComponentPortal(SpinnerComponent));
    }
  }

  private stopSpinner() {
    const overlayRef = this.getOrCreateSpinnerOverlay();
    overlayRef.detach();
  }

  public readonly emptySpinner = defer(() => {
    this.showSpinner();
    return NEVER.pipe(
      finalize(() => {
        this.spinnerTopRefLight?.hasAttached() ? this.stopSpinner() : null;
      })
    );
  }).pipe(share());
}
