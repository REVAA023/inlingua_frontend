import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactMask',
  standalone: true
})
export class ContactMaskPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    value = value.toString();
    const lastFourDigits = value.slice(-4);
    return `****${lastFourDigits}`;
  }

}
