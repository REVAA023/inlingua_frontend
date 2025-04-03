import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTrimInput]',
  standalone: true
})
export class TrimInputDirective {

  @Input() appTrimInput: any = true;

  constructor(private el: ElementRef) {}

  @HostListener('blur')
  @HostListener('input')
  onInputChange() {
    if (this.appTrimInput) {
      const value = this.el.nativeElement.value.trim();
      this.el.nativeElement.value = value;
    }
  }
}
