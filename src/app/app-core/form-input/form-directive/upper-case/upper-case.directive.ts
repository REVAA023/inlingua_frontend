import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngModel][appUpperCase]',
  standalone: true
})
export class UpperCaseDirective {
  @Input() appUpperCase = false;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event: any) {
    // g($event);
    if (this.appUpperCase) {
      this.value = $event.target.value.toUpperCase();
      this.ngModelChange.emit(this.value);
    }
  }
}
