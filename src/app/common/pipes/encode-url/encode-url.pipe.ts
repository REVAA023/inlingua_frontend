import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeUrl',
  standalone: true,
})
export class EncodeUrlPipe implements PipeTransform {

  transform(value: any, decode: boolean = false) {
    if (value == null) {
      return null;
    }

    try {
      if (decode) {
        const decodedValue = JSON.parse(atob(decodeURIComponent(value)));
        return decodedValue.data || decodedValue;
      }

      const dataToEncode = typeof value === 'object' ? { data: value } : { data: String(value) };
      return encodeURIComponent(btoa(JSON.stringify(dataToEncode)));
    } catch (error) {
      console.error('EncodeUrlPipe error:', error);
      return null;
    }
  }
}
