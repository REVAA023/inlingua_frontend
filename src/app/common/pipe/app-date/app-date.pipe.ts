// import { Pipe, PipeTransform } from '@angular/core';
// import { format, isMatch, parse } from 'date-fns';
// import { AppSettingsService } from '../../services/app-settings/app-settings.service';

// @Pipe({
//   name: 'appDate',
//   standalone: true
// })
// export class AppDatePipe implements PipeTransform {
//   constructor(public appSetting: AppSettingsService) { }
//   transform(value: any, returnformat?: any, xformat?: any): any {

//     let prasedDate: any = '';
//     let formatedDate: any = '';
//     let dateViewFormat = this.appSetting.environment.dateViewFormat;
//     let dateViewFormatWithTime =
//       this.appSetting.environment.dateViewFormatWithTime;

//     if (!value) {
//       return '';
//     }
//     if (xformat) {
//       prasedDate = parse(value, xformat, new Date());
//       formatedDate = format(prasedDate, returnformat);
//       return formatedDate;
//     }
    

//     let dateFormat = this.appSetting.environment.serverDateFormat;
//     let dateFormatWithTime =
//       this.appSetting.environment.serverDateFormatWithTime;
//     let valueDateFormat = this.appSetting.environment.serverDateFormatWithTime;
//     if (isMatch(value, dateFormat)) {
//       valueDateFormat = dateFormat;
//     } else if (isMatch(value, dateFormatWithTime)) {
//       valueDateFormat = dateFormatWithTime;
//     }

//     if (returnformat) {
//       if (returnformat === 'datetime') {
//         prasedDate = parse(value, valueDateFormat, new Date());
//         formatedDate = format(prasedDate, dateViewFormatWithTime);
//         return formatedDate;
//       } else {
//         prasedDate = parse(value, valueDateFormat, new Date());
//         formatedDate = format(prasedDate, returnformat);
//         return formatedDate;
//       }
//     }

//     prasedDate = parse(value, valueDateFormat, new Date());
//     formatedDate = format(prasedDate, dateViewFormat);
//     return formatedDate;
//   }
// }

import { Pipe, PipeTransform } from '@angular/core';
import { format, isMatch, parse, parseISO } from 'date-fns';
import { AppSettingsService } from '../../services/app-settings/app-settings.service';

@Pipe({
  name: 'appDate',
  standalone: true
})
export class AppDatePipe implements PipeTransform {
  constructor(public appSetting: AppSettingsService) {}

  transform(value: any, returnformat?: string, xformat?: string): any {
    if (!value) {
      return '';
    }

    let parsedDate: Date;
    let formattedDate: string;
    const {
      dateViewFormat,
      dateViewFormatWithTime,
      serverDateFormat,
      serverDateFormatWithTime,
    } = this.appSetting.environment;


    
    // Handle custom input format (xformat)
    if (xformat) {
      try {
        parsedDate = parse(value, xformat, new Date());
        if (returnformat) {
          return format(parsedDate, returnformat);
        }
        return format(parsedDate, dateViewFormat);
      } catch {
        return ''; // Return empty string if parsing fails
      }
    }

    // Handle ISO 8601 format directly
    if (value.includes('T')) {
      try {
        parsedDate = parseISO(value);
        if (returnformat) {
          return format(parsedDate, returnformat);
        }
        return format(parsedDate, dateViewFormat);
      } catch {
        return ''; // Return empty string if parsing fails
      }
    }

    // Handle default server formats
    let valueDateFormat = serverDateFormatWithTime;
    if (isMatch(value, serverDateFormat)) {
      valueDateFormat = serverDateFormat;
    }

    try {
      parsedDate = parse(value, valueDateFormat, new Date());
      if (returnformat) {
        if (returnformat === 'datetime') {
          
          return format(parsedDate, dateViewFormatWithTime);
        }
        return format(parsedDate, returnformat);
      }
      return format(parsedDate, dateViewFormat);
    } catch {
      return ''; // Return empty string if parsing fails
    }
  }
}

