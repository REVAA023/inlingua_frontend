import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailMask',
  standalone: true
})
export class EmailMaskPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return '';
    }
    let maskid = value.replace(/^(.)(.*)(.@.*)$/,
      (_: any, a: any, b: string, c: any) => a + b.replace(/./g, '*') + c
    );
    return maskid;
  }

}
