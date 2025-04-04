import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteToMb',
  standalone: true
})
export class ByteToMbPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    if (value == null || isNaN(value)) {
      return 'Invalid number';
    }

    // Convert bytes to megabytes
    const mbValue = value / (1024 * 1024);
    // Return the value formatted to two decimal places
    return mbValue.toFixed(2) + ' MB';
  }

}
