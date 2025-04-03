import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Directive({
  selector: "[ngModel][appNumberOnly]",
  standalone: true
})
export class NumberOnlyDirective {
  @Input() decimal: number = 0;
  @Input() limit: number = -1;
  @Input() max: number = -1;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  private checkLimit(value: string): boolean {
    if (this.limit !== -1 && value.length > this.limit) {
      return false;
    }
    return true;
  }

  private checkMax(value: number): boolean {
    if (this.max !== -1 && value > this.max) {
      return false;
    }
    return true;
  }

  private checkDecimal(value: string): boolean {
    if (this.decimal !== 0) {
      const decimalPart = value.split('.')[1] || '';
      if (decimalPart.length > this.decimal) {
        return false;
      }
    } else if (value.includes('.')) {
      return false;
    }
    return true;
  }

  private checkNumeric(value: string): boolean {
    const regex = this.decimal === 0 ? new RegExp(`^\\d*$`) : new RegExp(`^\\d*(\\.\\d{0,${this.decimal}})?$`);
    return regex.test(value);
  }

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    // const initialValue = this.el.nativeElement.value;
    const initialValue = this.el.nativeElement.value.replace(',', '');
    this.el.nativeElement.value = initialValue;
    this.ngModelChange.emit(initialValue);

    if (!this.checkLimit(initialValue) || !this.checkMax(parseFloat(initialValue)) || !this.checkDecimal(initialValue) || !this.checkNumeric(initialValue)) {
      this.el.nativeElement.value = initialValue.slice(0, -1);
      this.ngModelChange.emit(this.el.nativeElement.value);
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event']) onBlur(event: any) {
    let value = this.el.nativeElement.value;
    if (value === '.') {
      value = 0; this.el.nativeElement.value = value;
      this.ngModelChange.emit(this.el.nativeElement.value);
    };
    if (this.decimal !== 0 && value && !value.includes('.')) {
      value = value + '.' + '0'.repeat(this.decimal);
      this.el.nativeElement.value = value;
      this.ngModelChange.emit(this.el.nativeElement.value);
    }
  }
}
