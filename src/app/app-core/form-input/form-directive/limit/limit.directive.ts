import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngModel][appLimit]',
  standalone: true
})
export class LimitDirective {
  @Input("appLimit") limit: any = -1;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  constructor(private el: ElementRef) { }

  @HostListener("input", ["$event"]) onInputChange($event: any) {
    let xvalue = $event.target.value.toString();
    // On Limit Set
    if (this.limit > 0) {
      xvalue.length > this.limit
        ? (xvalue = xvalue.substring(0, this.limit))
        : "";
    }
    $event.target.value = xvalue;
    this.ngModelChange.emit(xvalue);
  };
}
