import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailMask',
  standalone: true
})
export class EmailMaskPipe implements PipeTransform {

  transform(value: string | null | undefined, maskChar: string = '*', unmaskedLength: number = 1): string {
    debugger
    if (!value || typeof value !== 'string' || !this.isValidEmail(value)) {
      return '';
    }

    const [username, domain] = value.split('@');

    if (username.length <= unmaskedLength) {
      return value;
    }

    const unmaskedPart = username.slice(0, unmaskedLength);
    const maskedPart = maskChar.repeat(username.length - unmaskedLength);

    return `${unmaskedPart}${maskedPart}@${domain}`;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
