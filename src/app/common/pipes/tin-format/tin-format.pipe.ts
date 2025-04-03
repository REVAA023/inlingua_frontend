import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tinFormat',
  standalone: true,
})
export class TinFormatPipe implements PipeTransform {

  async transform(tin: any, format: string = 'xx-xxxxx-x-x'): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        if (!tin || typeof tin !== 'string' && typeof tin !== 'number') {
          resolve('Invalid TIN');
          return;
        }

        let tinString = tin.toString().replace(/\D/g, ''); 

        if (!this.isValidTin(tinString)) {
          resolve('Invalid TIN'); 
          return;
        }

        const formattedTin = this.applyFormat(tinString, format);
        resolve(formattedTin);
      } catch (error) {
        console.error('TinFormatPipe Error:', error);
        reject('Error formatting TIN');
      }
    });
  }

  private isValidTin(tin: string): boolean {
    return /^\d{9,12}$/.test(tin);
  }

  private applyFormat(tin: string, format: string): string {
    const tinArray = tin.split('');
    let formattedTin = '';
    let index = 0;

    for (const char of format) {
      if (char === 'x' && index < tinArray.length) {
        formattedTin += tinArray[index++];
      } else {
        formattedTin += char;
      }
    }

    return formattedTin.substring(0, format.length);
  }
}
