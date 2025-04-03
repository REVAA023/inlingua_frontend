import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteToMb',
  standalone: true,
})
export class ByteToMbPipe implements PipeTransform {

  transform(value: number | null | undefined, decimals: number = 2): string {
    if (value == null || isNaN(value)) {
      return 'Invalid input';
    }

    if (value < 0) {
      return 'Negative values not allowed';
    }

    const mbValue = value / (1024 * 1024);

    return `${mbValue.toFixed(decimals)} MB`;
  }

}
