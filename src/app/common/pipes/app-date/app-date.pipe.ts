import { Pipe, PipeTransform } from '@angular/core';
import { format, isMatch, parse } from 'date-fns';
import { AppSettingsService } from '../../services/app-settings/app-settings.service';

@Pipe({
  name: 'appDate',
  standalone: true
})
export class AppDatePipe implements PipeTransform {
  constructor(public appSetting: AppSettingsService) { }
  
  transform(value: any, returnFormat?: any, xFormat?: any): any {

    let parsedDate: any = '';
    let formateDate: any = '';
    let dateViewFormat = this.appSetting.environment.dateViewFormat;
    let dateViewFormatWithTime =
      this.appSetting.environment.dateViewFormatWithTime;

    if (!value) {
      return '';
    }

    if (xFormat) {
      parsedDate = parse(value, xFormat, new Date());
      formateDate = format(parsedDate, returnFormat);
      return formateDate;
    }
    let dateFormat = this.appSetting.environment.serverDateFormat;
    let dateFormatWithTime =
      this.appSetting.environment.serverDateFormatWithTime;
    let valueDateFormat = this.appSetting.environment.serverDateFormatWithTime;
    if (isMatch(value, dateFormat)) {
      valueDateFormat = dateFormat;
    } else if (isMatch(value, dateFormatWithTime)) {
      valueDateFormat = dateFormatWithTime;
    }

    if (returnFormat) {
      if (returnFormat === 'datetime') {
        parsedDate = parse(value, valueDateFormat, new Date());
        formateDate = format(parsedDate, dateViewFormatWithTime);
        return formateDate;
      } else {
        parsedDate = parse(value, valueDateFormat, new Date());
        formateDate = format(parsedDate, returnFormat);
        return formateDate;
      }
    }

    parsedDate = parse(value, valueDateFormat, new Date());
    formateDate = format(parsedDate, dateViewFormat);
    return formateDate;
  }
}
