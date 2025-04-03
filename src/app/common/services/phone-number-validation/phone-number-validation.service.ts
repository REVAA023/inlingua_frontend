import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberValidationService {

  constructor(private appSetting: AppSettingsService) { }

  getValidator(countryCode: string): ValidatorFn {
    const rule = this.appSetting.countryData.find((rule: any) => rule.code === countryCode);
    if (!rule) {
      throw new Error(`No validation rule found for country code: ${countryCode}`);
    }

    return (control: AbstractControl) => {
      const value = control.value;
      if (rule.validationCode.test(value)) {
        return null; // Valid
      }
      return { invalidPhoneNumber: true }; // Invalid
    };
  }
}
