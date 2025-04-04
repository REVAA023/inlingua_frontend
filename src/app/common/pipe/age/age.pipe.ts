import { Pipe, PipeTransform } from '@angular/core';
import { parse, differenceInYears } from 'date-fns';

@Pipe({
  name: 'isUnderage',
  standalone: true
})
export class AgePipe implements PipeTransform {

  transform(dob: string, serverDateFormat: string): boolean {
    if (!dob || !serverDateFormat) return false;
    const date = parse(dob, serverDateFormat, new Date());
    const age = differenceInYears(new Date(), date);
    return age <= 18;
  }

}
