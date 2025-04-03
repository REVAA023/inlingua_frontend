import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngModel][appPinNumberOnly]',
  standalone: true
})
export class PinNumberOnlyDirective {
  limits = 1;
  @Input('next') xnext: any = '';
  @Input('prev') xprev: any = '';
  regex = /\D+/g;
  value: any = '';
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange($event: any) {
    let xvalue = $event.target.value.toString();
    xvalue.length > 1 ? xvalue = xvalue.substring(0, 1) : '';
    const value = xvalue.replace(this.regex, '');
    $event.target.value = value;
    this.ngModelChange.emit(value);
    if (value !== '') {
      const element = document.getElementById(this.xnext);
      if (element == null) {
        return;
      } else {
        element.focus();
      }
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    const current: string = this.el.nativeElement.value;
    if (event.key === 'Backspace') {
      if (current === '') {
        const prevelement = document.getElementById(this.xprev);
        if (prevelement) {
          prevelement.focus();
        }
        return;
      } else {
        return;
      }
    }
  }
}
