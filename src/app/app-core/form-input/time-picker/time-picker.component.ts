import { Platform } from '@angular/cdk/platform';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
  Optional,
  Self,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { Row } from '../../core-component/core-component.component';
import { CharacterOnlyDirective } from '../form-directive/character-only/character-only.directive';
import { LimitDirective } from '../form-directive/limit/limit.directive';
import { LowerCaseDirective } from '../form-directive/lower-case/lower-case.directive';
import { NoEmojiDirective } from '../form-directive/no-emoji/no-emoji.directive';
import { NumberOnlyDirective } from '../form-directive/number-only/number-only.directive';
import { UpperCaseDirective } from '../form-directive/upper-case/upper-case.directive';
import { CustomDateAdapter } from '../input-control/custom-date-adapter';
import { FilterAndSortPipe } from '../pipes/filter-and-sort/filter-and-sort.pipe';
import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ActivatedRoute } from '@angular/router';
import { AppSettingsService } from '../../../common/services/app-settings/app-settings.service';
import { FromInputControl } from '../form-input-control';
import { format, isMatch, isValid, parse, subYears } from 'date-fns';

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
  selector: 'app-time-picker',
  standalone: true,

  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
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
    MatDatepickerModule,
    NumberOnlyDirective,
    MatTooltipModule,
    AppDatePipe,
    CharacterOnlyDirective,
    Row,
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
export class TimePickerComponent extends FromInputControl implements OnInit {
  overlayRef!: OverlayRef;
  __xvalue: any = '';
  __minDate: any = '';
  __maxDate: any = '';
  __isAdult = false;
  __isMinor = false;
  __hideFuture = false;
  __removeBg = false;
  __statusColorName = '';
  __subYears = 18;
  __colorChanges = '';
  __hideIcon = false;
  __hideOldValue = false;
  __isVerified = false;

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
  set hideOldValue(hideOldValue: boolean) {
    this.__hideOldValue = hideOldValue || false;
  }
  get hideOldValue() {
    return this.__hideOldValue;
  }

  @Input()
  set isVerified(isVerified: boolean) {
    this.__isVerified = isVerified || false;
  }
  get isVerified() {
    return this.__isVerified;
  }

  @Input()
  set hideIcon(hideIcon: boolean) {
    this.__hideIcon = hideIcon || false;
  }
  get hideIcon() {
    return this.__hideIcon;
  }

  @Input()
  set statusColorName(statusColorName: string) {
    this.__statusColorName = statusColorName || '';
  }
  get statusColorName() {
    return this.__statusColorName;
  }

  @Input()
  set colorChanges(colorChanges: string) {
    this.__colorChanges = colorChanges || '';
  }
  get colorChanges() {
    return this.__colorChanges;
  }

  @ViewChild('dropdownTemplate') dropdownTemplate!: any;

  hour = '00';
  minutes = '00';
  meridiem = 'AM'; // Default value for meridian
  xValueDateTime: any = '';
  meridian = false;

  constructor(
    @Self() @Optional() public control: NgControl,
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public appSetting: AppSettingsService
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit(): void {
    this.viewValueChange().subscribe(async (xValue) => {
      if (
        this.value !== null &&
        this.value !== '' &&
        this.value !== undefined
      ) {
        this.xValueDateTime = await this.getLocalDate(this.value);
        this.hour = format(this.xValueDateTime, 'HH');
        this.minutes = format(this.xValueDateTime, 'mm');
        if (this.meridian) {
          this.meridiem = format(this.xValueDateTime, 'a');
          this.hour = format(this.xValueDateTime, 'hh');
        }
        this.value = this.meridian
          ? format(this.xValueDateTime, 'hh:mm a')
          : format(this.xValueDateTime, 'HH:mm');
      } else {
        this.hour = format(new Date(), this.meridian ? 'hh' : 'HH');
        this.minutes = format(new Date(), 'mm');
        if (this.meridian) {
          this.meridiem = format(new Date(), 'a');
        }
        this.value = '';
        this.xValueDateTime = new Date();
      }
    });
    this.setValidate(this.control);
  }

  getLocalDate(dateString: any): Promise<Date> {
    
    return new Promise(async (resolve, reject) => {
      if (typeof dateString !== 'string') {
        reject(new Error('Invalid dateString: Expected a string'));
        return;
      }

      if (isMatch(dateString, this.meridian ? 'hh:mm a' : 'HH:mm')) {
        reject(new Error('Time format matched, but no action taken.'));
        return;
      }

      let parseDateFormat = await this.getDateFormat(dateString);
      let parsedDate = parse(dateString, parseDateFormat, new Date());

      if (this.appSetting.environment.utc) {
        let year = parseFloat(format(parsedDate, 'yyyy'));
        let month = parseFloat(format(parsedDate, 'MM')) - 1;
        let date = parseFloat(format(parsedDate, 'dd'));
        let hour = parseFloat(format(parsedDate, 'HH'));
        let minutes = parseFloat(format(parsedDate, 'mm'));
        let localTime = new Date(Date.UTC(year, month, date, hour, minutes));
        resolve(localTime);
      } else {
        resolve(parsedDate);
      }
    });
  }

  getDateFormat(date: string): Promise<string> {
    return new Promise((resolve) => {
      let dateFormat = this.appSetting.environment.serverDateFormat;
      let dateFormatWithTime =
        this.appSetting.environment.serverDateFormatWithTime;
      let parseDateFormat =
        this.appSetting.environment.serverDateFormatWithTime;
      if (isMatch(date, dateFormat)) {
        parseDateFormat = dateFormat;
      } else if (isMatch(date, dateFormatWithTime)) {
        parseDateFormat = dateFormatWithTime;
      }
      resolve(parseDateFormat);
    });
  }

  openOverlay() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.formInput)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    const overlayConfig = new OverlayConfig({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass: 'custom-overlay-panel',
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    const templatePortal = new TemplatePortal(
      this.dropdownTemplate,
      this.viewContainerRef
    );
    this.overlayRef.attach(templatePortal);
    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  clearAll() {
    this.value = '';
    this.closeOverlay();
  }

  submitDate() {
    let hour = parseFloat(this.hour);
    let hourString = this.hour;

    if (this.meridian) {
      if (this.meridiem === 'PM' && hour !== 12) {
        hour += 12;
      } else if (this.meridiem === 'AM' && hour === 12) {
        hour = 0;
      }
      hourString = hour < 10 ? '0' + hour : hour.toString();
    }

    let minutes: any = this.minutes.split(' ');
    if (minutes.length > 1) {
      this.minutes = minutes[0];
    }
    this.value =
      hourString +
      ':' +
      this.minutes.toString() +
      (this.meridian ? ' ' + this.meridiem : '');
    this.closeOverlay();
  }

  setupClick(type: any, val: any) {
    switch (type) {
      case 'hour':
        let hour = parseFloat(this.hour);
        let newHour = hour + val;
        if (this.meridian) {
          newHour < 1 ? (newHour = 12) : '';
          newHour > 12 ? (newHour = 1) : '';
        } else {
          newHour < 0 ? (newHour = 23) : '';
          newHour > 23 ? (newHour = 0) : '';
        }
        this.hour = newHour < 10 ? '0' + newHour : newHour.toString();
        break;
      case 'minutes':
        let minutes = parseFloat(this.minutes);
        let newMinutes = minutes + val;
        newMinutes < 0 ? (newMinutes = 59) : '';
        newMinutes > 59 ? (newMinutes = 0) : '';
        this.minutes =
          newMinutes < 10 ? '0' + newMinutes : newMinutes.toString();
        break;

      default:
        break;
    }
  }

  onLocalClear() {
    if (this.__type === 'date') {
      this.value = '';
      this.__xvalue = '';
    }
    this.onAction('clear');
  }
}
