import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { parse, differenceInYears } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class AgeCalculatorService {
  private serverDateFormat = this.appSetting.environment.serverDateFormat;

  constructor(public appSetting: AppSettingsService) { }

  isAge18OrAbove(dob: string): boolean {
    if (!dob) return false;

    const birthDate = parse(dob, this.serverDateFormat, new Date());
    const age = differenceInYears(new Date(), birthDate);

    return age >= 18;
  }
}
