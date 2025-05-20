import { CUSTOM_ELEMENTS_SCHEMA, Component, ContentChild, Input, OnInit, Optional, Self, TemplateRef } from '@angular/core';
import { FromInputControl } from '../form-input-control';
import { FormsModule, NgControl, NgForm } from '@angular/forms';
import { NoEmojiDirective } from '../form-directive/no-emoji/no-emoji.directive';
import { UpperCaseDirective } from '../form-directive/upper-case/upper-case.directive';
import { LowerCaseDirective } from '../form-directive/lower-case/lower-case.directive';
import { LimitDirective } from '../form-directive/limit/limit.directive';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FilterAndSortPipe } from '../pipes/filter-and-sort/filter-and-sort.pipe';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-adapter';
import { Platform } from '@angular/cdk/platform';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { addDays, addMonths, addYears, format, isMatch, isValid, parse, subDays, subYears } from 'date-fns';
import { AppSettingsService } from '../../../common/services/app-settings/app-settings.service';
import { NumberOnlyDirective } from '../form-directive/number-only/number-only.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CharacterOnlyDirective } from '../form-directive/character-only/character-only.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDatePipe } from '../../../common/pipe/app-date/app-date.pipe';
import { MAT_TIMEPICKER_CONFIG, MatTimepickerModule } from '@angular/material/timepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: "dd-MM-yyyy HH:mm",
  },
  display: {
    dateInput: "dd MMM yyyy",
    monthYearLabel: "MMM yyyy",
    dateA11yLabel: "dd MMM yyyy",
    monthYearA11yLabel: "MMMM yyyy",
  },
};

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgClass, NgTemplateOutlet, FormsModule, NoEmojiDirective, UpperCaseDirective, LowerCaseDirective, LimitDirective, FilterAndSortPipe, MatSelectModule, MatDatepickerModule, NumberOnlyDirective, MatTooltipModule, AppDatePipe, CharacterOnlyDirective, MatTimepickerModule],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    provideNativeDateAdapter(),
    {
      provide: MAT_TIMEPICKER_CONFIG,
      useValue: { interval: '30 minutes' },
    }
  ],
})
export class InputControlComponent extends FromInputControl implements OnInit {
  __xvalue: any = "";
  __minDate: any = "";
  __maxDate: any = "";
  __isAdult = false;
  __isMinor = false;
  __hideFuture = false;
  __removeBg = false;
  __subYears = 18;
  __assignIcon = false;
  __showCurrentNFuture = false;
  __maxCharacterLength = false;
  __addMaxYear = 0;
  __addMaxMonth = 0;
  // __removeClose = false;
  __tempMinDate = new Date();

  // @ContentChild('oldHtml') oldHtml!: TemplateRef<any>;

  @Input()
  set addMaxMonth(addMaxMonth: number) {
    this.__addMaxMonth = addMaxMonth || 0;
    if (this.__addMaxMonth > 0) {
      this.setAddMaxMonth();
    }
  }
  get addMaxMonth() {
    return this.__addMaxMonth;
  }

  @Input()
  set minDate(minDate: string) {
    if (minDate !== '') {
      this.getParsedDate(minDate).then((result: any) => {
        if (result) {
          this.__tempMinDate = result;
          if (!this.isFuture) {
            this.__minDate = result
          } else {
            this.__minDate = addDays(result, 1);
          }
          if (this.__addMaxYear > 0) {
            this.setAddMaxYear();
          }
          if (this.__addMaxMonth > 0) {
            this.setAddMaxMonth();
          }
        };
      });

    } else {
      this.__minDate = '';
    }
  }
  get minDate() {
    return this.__minDate;
  }

  @Input()
  set maxDate(maxDate: string) {

    if (maxDate !== '') {
      this.getParsedDate(maxDate).then((result: any) => {
        if (result) this.__maxDate = result;
      });
    } else {
      this.__maxDate = ''
    }
  }
  get maxDate() {
    return this.__maxDate;
  }

  @Input() isFuture = false;
  @Input()
  set isAdult(isAdult: boolean) {
    this.__isAdult = isAdult || false;
    this.__isAdult ? this.__maxDate = subYears(new Date(), this.__subYears) : "";
  }
  get isAdult() {
    return this.__isAdult;
  }
  @Input()
  set showCurrentNFuture(showCurrentNFuture: boolean) {
    this.__showCurrentNFuture = showCurrentNFuture || false;
    if (this.__showCurrentNFuture) {
      this.__minDate = new Date();
    }
  }
  get showCurrentNFuture() {
    return this.__showCurrentNFuture;
  }
  @Input()
  set addMaxYear(addMaxYear: number) {
    this.__addMaxYear = addMaxYear || 0;
    if (this.__addMaxYear > 0) {
      this.setAddMaxYear();
    }
  }
  get addMaxYear() {
    return this.__addMaxYear;
  }

  setAddMaxMonth() {
    let nextSixMonthDate = addMonths(this.__tempMinDate, this.__addMaxMonth);
    let minDate = subDays(nextSixMonthDate, -1);
    this.__minDate = minDate;

  }

  setAddMaxYear() {
    let nextThreeYearDate = addYears(this.__tempMinDate, this.__addMaxYear);
    let maxDate = subDays(nextThreeYearDate, 1);
    this.__maxDate = maxDate;

  }
    onLocalAction(type: any) {
    this.onAction(type);
    if (this.__type === 'email') {
      if (this.control && this.control.control && this.control.control.errors) {
        let error: any = this.control.control.errors;
        if (error.email) { this.__errorTrue = true }
      }
    }
  }

  @Input()
  set maxCharacterLength(maxCharacterLength: boolean) {
    this.__maxCharacterLength = maxCharacterLength || false;
  }
  get maxCharacterLength() {
    return this.__maxCharacterLength;
  }



  @Input()
  set isMinor(isMinor: boolean) {
    this.__isMinor = isMinor || false;
    this.__isMinor ? this.__minDate = subYears(new Date(), this.__subYears) : "";
  }
  get isMinor() {
    return this.__isMinor;
  }

  @Input()
  set hideFuture(hideFuture: boolean) {
    this.__hideFuture = hideFuture || false;
    this.__hideFuture ? this.__maxDate = new Date() : "";
  }
  get hideFuture() {
    return this.__hideFuture;
  }

  @Input()
  set removeBg(removeBg: boolean) {
    this.__removeBg = removeBg || false;
  }
  get removeBg() {
    return this.__removeBg;
  }

  @Input()
  set assignIcon(assignIcon: boolean) {
    this.__assignIcon = assignIcon || false;
  }
  get assignIcon() {
    return this.__assignIcon;
  }

  @Input()
  set subYears(subYears: number) {
    this.__subYears = subYears || 18;
  }
  get subYears() {
    return this.__subYears;
  }

  dateChangesubscribe: any;

  constructor(@Self() @Optional() public control: NgControl, public appSetting: AppSettingsService, private route: ActivatedRoute) {
    super();


    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit(): void {

    if (['date', 'time'].includes(this.__type)) {
      debugger;

      this.dateChangesubscribe = this.viewValueChange().subscribe(async (xValue: any) => {
        if (!xValue) return;

        if (typeof this.value === 'string' && this.value.trim() !== '') {
          const method = this.__type === 'date' ? this.getParsedDate : this.getParsedTime;
          this.__xvalue = await method.call(this, this.value);
        } else {
          this.__xvalue = '';
        }
      });
    }

    // if (this.route.snapshot.data['title']) {
    //   let routeTitle = this.route!.snapshot.data['title'];
    //   if (routeTitle) {
    //     let helperText = this.appSetting.helperText[routeTitle]?.[this.name];
    //     if (helperText) {
    //       this.helpText = helperText;
    //     }
    //   }
    // }
    this.setValidate(this.control);
    this.generatePNR();
  }



  isSelectOpened(event: any) {
    if (event) {
      this.__selectSearchInput = "";
      // setTimeout(() => {
      //   this.formInput?.nativeElement.focus();
      // }, 200);
    }
  }

  getParsedDate(date: string) {

    return new Promise((resolve) => {
      if (!date) resolve(null);
      let parseFormat = "";
      if (isMatch(date, this.appSetting.environment.serverDateFormat)) parseFormat = this.appSetting.environment.serverDateFormat;
      if (isMatch(date, this.appSetting.environment.serverDateFormatWithTime)) parseFormat = this.appSetting.environment.serverDateFormatWithTime;
      if (parseFormat === "") resolve(null);
      let parsedDate = parse(date, parseFormat, new Date());
      resolve(parsedDate);
    })
  }

  getParsedTime(date: string) {

    return new Promise((resolve) => {
      if (!date) resolve(null);
      let parseFormat = "";
      if (isMatch(date, this.appSetting.environment.serverTimeFormat)) parseFormat = this.appSetting.environment.serverTimeFormat;
      if (parseFormat === "") resolve(null);
      let parsedDate = parse(date, parseFormat, new Date());
      resolve(parsedDate);
    })
  }

  onDateChange() {
    if (!isValid(this.__xvalue)) return;
    this.value = format(this.__xvalue, this.appSetting.environment.serverDateFormat);
    this.onAction('change');
  }

  onTimeChange() {
    if (!isValid(this.__xvalue)) return;
    this.value = format(this.__xvalue, this.appSetting.environment.serverTimeFormat);
    this.onAction('change');
  }

  onLocalClear() {
    if (this.__type === 'date') {
      this.value = "";
      this.__xvalue = "";
    }
    this.onAction('clear');
  }
}
