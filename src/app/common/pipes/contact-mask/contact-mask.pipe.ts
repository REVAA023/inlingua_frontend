import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactMask',
  standalone: true,
})
export class ContactMaskPipe implements PipeTransform {

  transform(value: string | null | undefined,
    maskChar: string = '*',
    startVisibleLength: number,
    endVisibleLength: number): string {
    debugger
    if (!value || typeof value !== 'string') {
      return '';
    }

    const valueLength = value.length;

    // If the visible lengths exceed or equal the total length, return the original value
    if (startVisibleLength + endVisibleLength >= valueLength) {
      return value;
    }

    const maskedPartLength = valueLength - (startVisibleLength + endVisibleLength);
    const startPart = value.slice(0, startVisibleLength);
    const endPart = value.slice(-endVisibleLength);
    const maskedPart = maskChar.repeat(maskedPartLength);

    return `${startPart}${maskedPart}${endPart}`;
  }

}
