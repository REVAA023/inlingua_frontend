import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTinNumberInput]',
  standalone: true,
})
export class TinNumberInputDirective {
  @Input() xValue: any;
  @Input() value: any;
  @Input() errorText: any;

  @HostListener('input', ['$event']) async onInputChange($event: any) {
    
    if ($event.inputType !== "deleteContentBackward") {
      let val = await this.checkTIN($event.target.value.toString());
      $event.target.value = val;
      this.xValue = val;
      this.errorText = 'Tin No is Invalid';
    }
    else {
      this.errorText = '';
    }
    let tempValue = this.xValue.split('-').join("");
    if (tempValue.length === 9) {
      this.errorText = '';
      this.value = this.xValue.split('-').join("");
      // this.change.emit(this.value);
    } else {
      this.value = this.xValue.split('-').join("");   // for errorText
      this.errorText = 'Tin No is Invalid';
      // this.value = "";
      // this.change.emit(this.value);
    }
    if (tempValue.length === 0) {
      this.errorText = '';
    }
  }

  checkTIN(tin: any) {
    // return new Promise((resolve) => {
    //   let val = tin.toString();
    //   val = val.replace(/\D/g, ''); // Remove all non-digit characters

    //   if (val.length <= 2) {
    //     val = val.replace(/^(\d{1,2})$/, '$1'); // XX
    //   } else if (val.length <= 7) {
    //     val = val.replace(/^(\d{2})(\d{1,5})$/, '$1-$2'); // XX-XXXXX
    //   } else if (val.length <= 8) {
    //     val = val.replace(/^(\d{2})(\d{5})(\d{1})$/, '$1-$2-$3'); // XX-XXXXX-X
    //   } else {
    //     val = val.replace(/^(\d{2})(\d{5})(\d{1})(\d{1})$/, '$1-$2-$3-$4'); // XX-XXXXX-X-X
    //   }

    //   resolve(val);
    // });
    return new Promise((resolve) => {
      let val = tin.toString();
      val = val.replace(/\D/g, ''); // Remove all non-digit characters
      val = val.replace(/^(\d{2})(\d{5})(\d{1})(\d{1}).*/, '$1-$2-$3-$4'); // Format as xx-xxxxx-x-x
    
      // Optional: Limit the length to 12 characters if necessary
      val = val.substring(0, 12);
      
      resolve(val);
    });
  }
  
}
