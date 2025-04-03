import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngModel][appNoEmoji]',
  standalone: true
})
export class NoEmojiDirective {
  orginalRegex = /[^\w.,&()\s]/g;
  regex = /[^\w.,@!#$%^&*'"|}<>~?|\{`)(-_=+;:\s]/g;

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  @Input() appNoEmoji: any = false;
  value: any;

  @HostListener('input', ['$event']) onInputChange($event: any) {
    if (!this.appNoEmoji) {
      this.regex = this.orginalRegex;
    }
    this.value = $event.target.value.replace(this.regex, '');
    $event.target.value = this.value;
    this.ngModelChange.emit(this.value);
   
  }
}
