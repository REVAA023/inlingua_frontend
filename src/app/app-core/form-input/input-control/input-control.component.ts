import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ContentChild,
  HostListener,
  Input,
  OnInit,
  Optional,
  Self,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FromInputControl } from '../form-input-control';
import { FormsModule, NgControl, NgForm } from '@angular/forms';
import { NoEmojiDirective } from '../form-directive/no-emoji/no-emoji.directive';
import { UpperCaseDirective } from '../form-directive/upper-case/upper-case.directive';
import { LowerCaseDirective } from '../form-directive/lower-case/lower-case.directive';
import { LimitDirective } from '../form-directive/limit/limit.directive';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FilterAndSortPipe } from '../pipes/filter-and-sort/filter-and-sort.pipe';
import { MatSelectModule } from '@angular/material/select';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-adapter';
import { Platform } from '@angular/cdk/platform';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { addDays, addMonths, isMatch, format, isValid, parse, subDays, subYears } from 'date-fns';
import { AppSettingsService } from '../../../common/services/app-settings/app-settings.service';
import { NumberOnlyDirective } from '../form-directive/number-only/number-only.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CharacterOnlyDirective } from '../form-directive/character-only/character-only.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { Row } from '../../core-component/core-component.component';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TinNumberInputDirective } from '../form-directive/tin-number-input/tin-number-input.directive';
import { TrimInputDirective } from '../form-directive/trim-input/trim-input.directive';
import { AppButton } from '../../core-component/core-directives.directive';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';

export const MY_FORMATS = {
  parse: {
    dateInput: 'dd-MM-yyyy HH:mm',
  },
  display: {
    dateInput: 'dd MMM yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd MMM yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgClass,
    NgTemplateOutlet,
    FormsModule,
    NoEmojiDirective,
    UpperCaseDirective,
    LowerCaseDirective,
    LimitDirective,
    FilterAndSortPipe,
    MatSelectModule,
    TinNumberInputDirective,
    MatDatepickerModule,
    NumberOnlyDirective,
    MatTooltipModule,
    AppDatePipe,
    CharacterOnlyDirective,
    Row,
    TrimInputDirective,
    AppButton
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class InputControlComponent extends FromInputControl implements OnInit {
  __xvalue: any = '';
  __minDate: any = '';
  __maxDate: any = '';
  __isAdult = false;
  __isMinor = false;
  __hideFuture = false;
  __removeBg = false;
  __subYears = 18;
  __hideOldValue = false;
  __tableInputError = false;
  __assignIcon = false;
  __isContactNo = false;
  __maxCharacterLength = false;
  @Input() isFuture = false;
  __addMaxMonth = 0;
  // @ContentChild('oldHtml') oldHtml!: TemplateRef<any>;
  @ViewChild('searchInput') searchInput!: any;
  overlayRef!: OverlayRef;
  __tempMinDate = new Date();



  @ViewChild('dropdownTemplate') dropdownTemplate!: any;

  @Input()
  set addMaxMonth(addMaxMonth: number) {
    this.__addMaxMonth = addMaxMonth || 0;
    if(this.__addMaxMonth > 0){
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
          if (!this.isFuture) {
            this.__minDate = result
          } else {
            this.__minDate = addDays(result, 1);
          }
          if(this.__addMaxMonth > 0){
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

  setAddMaxMonth(){
    let nextSixMonthDate = addMonths(this.__tempMinDate, this.__addMaxMonth);
    let minDate = subDays(nextSixMonthDate, -1);
    this.__minDate = minDate;
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

  @Input()
  set isAdult(isAdult: boolean) {
    this.__isAdult = isAdult || false;
    this.__isAdult
      ? (this.__maxDate = subYears(new Date(), this.__subYears))
      : '';
  }
  get isAdult() {
    return this.__isAdult;
  }

  @Input()
  set isMinor(isMinor: boolean) {
    this.__isMinor = isMinor || false;
    this.__isMinor
      ? (this.__minDate = subYears(new Date(), this.__subYears))
      : '';
  }
  get isMinor() {
    return this.__isMinor;
  }

  @Input()
  set hideFuture(hideFuture: boolean) {
    this.__hideFuture = hideFuture || false;
    this.__hideFuture ? (this.__maxDate = new Date()) : '';
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
  set maxCharacterLength(maxCharacterLength: boolean) {
    this.__maxCharacterLength = maxCharacterLength || false;
  }
  get maxCharacterLength() {
    return this.__maxCharacterLength;
  }

  @Input()
  set isContactNo(isContactNo: boolean) {
    this.__isContactNo = isContactNo || false;
  }
  get isContactNo() {
    return this.__isContactNo;
  }

  @Input()
  set hideOldValue(hideOldValue: boolean) {
    this.__hideOldValue = hideOldValue || false;
  }
  get hideOldValue() {
    return this.__hideOldValue;
  }

  @Input()
  set tableInputError(tableInputError: boolean) {
    this.__tableInputError = tableInputError || false;
  }
  get tableInputError() {
    return this.__tableInputError;
  }

  dateChangesubscribe: any;

  constructor(
    @Self() @Optional() public control: NgControl,
    public appSetting: AppSettingsService,
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit(): void {
    this.getTemplate(this.__designType);
    if (this.appSetting.countryData.length > 0) {
      this.__selectedCountry = this.appSetting.countryData[0]
    }
    this.dateChangesubscribe = this.viewValueChange().subscribe(
      async (xValue: any) => {
        if (xValue) {
          if (this.value && this.value !== '' && typeof this.value === 'string') {
            if (this.__type === 'date') {

              this.__xvalue = await this.getParsedDate(this.value.toString());
            }
            if (this.__type === 'tin') {
              // this.__xvalue = await this.checkTIN(this.value);
              this.__xvalue = this.value;
            }
          } else {
            this.__xvalue = '';
          }
        }
      }

    );
    this.setValidate(this.control);
    this.generatePNR();
  }

  getTemplate(designType: string): TemplateRef<any> {
    return designType === 'textarea' ? this.textareaTemplate : this.defaultTemplate;
  }

  passValue() {
    this.onClick.emit(this.value);
  }

  isSelectOpened(event: any) {
    if (event) {
      this.__selectSearchInput = '';
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      }, 200);
    }
  }

  getParsedDate(date: string) {

    return new Promise((resolve) => {
      if (!date) resolve(null);
      if(date === '') resolve(null);
      let parseFormat = '';
      if (isMatch(date, this.appSetting.environment.serverDateFormat))
        parseFormat = this.appSetting.environment.serverDateFormat;
      if (isMatch(date, this.appSetting.environment.serverDateFormatWithTime))
        parseFormat = this.appSetting.environment.serverDateFormatWithTime;
      if (parseFormat === '') resolve(null);
      let parsedDate = parse(date, parseFormat, new Date());
      resolve(parsedDate);
    });
  }

  onDateChange() {
    if (!isValid(this.__xvalue)) return;
    this.value = format(
      this.__xvalue,
      this.appSetting.environment.serverDateFormat
    );
    this.onAction('change')
  }

  onLocalClear() {

    if (['date', 'tin'].includes(this.__type)) {
      this.value = '';
      this.__xvalue = '';
    }
    this.onAction('clear');
  }

  checkTIN(tin: any) {
    return new Promise((resolve) => {
      let formattedTIN = tin.toString()
        .replace(/\D/g, '').replace(/^(\d{2})(\d{5})(\d{1})(\d{1}).*/, '$1-$2-$3-$4');;
      resolve(formattedTIN);
    });
  }

  @HostListener("input", ["$event"]) async onInputChange(event: any) {
    if (this.__type === 'tin') {
      // this.__xvalue = this
      // return;
      this.value = "";
      // Skip processing if input is a backward delete
      if (event.inputType !== "deleteContentBackward") {
      let formattedValue: any = await this.checkTIN(event.target.value.toString());
      // let formattedValue = event.target.value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + '-' + formattedValue.substring(2);
      }
      if (formattedValue.length > 8) {
        formattedValue = formattedValue.substring(0, 8) + '-' + formattedValue.substring(8);
      }
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.substring(0, 10) + '-' + formattedValue.substring(10);
      }



      event.target.value = formattedValue;
      this.__xvalue = formattedValue;
      }
      const cleanValue = this.__xvalue.replace(/-/g, ""); // Remove hyphens
      if (cleanValue.length === 10) {
        this.value = cleanValue;
      }
    }
  }

  onLocalAction(type: any){
    this.onAction(type);
    if(this.__type === 'email'){
      if(this.control && this.control.control && this.control.control.errors) {
          let error: any = this.control.control.errors;
          if(error.email) {this.__errorTrue = true}
      }
    }
  }
}
