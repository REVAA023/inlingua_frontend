import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: "[ngModel][appCharacterOnly]",
  standalone: true,
})
export class CharacterOnlyDirective implements AfterViewInit {
  regex = /^[a-zA-Z0-9 _.-]()&*$/g;
  constructor(private el: ElementRef) { }
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  @Input() appCharacterOnly: any = true;
  ngAfterViewInit() {

  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    if (!this.appCharacterOnly) {
      let value = event.target.value;
      const match = value.match(this.regex);

      // if (!match) {
      //   value = value.replace(/[^\d\w\s]/g, "");
      // }

      event.target.value = value;
      this.ngModelChange.emit(value);
    }
  }
}

