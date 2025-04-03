import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { FromInputControl } from '../form-input/form-input-control';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppSettingsService } from '../../common/services/app-settings/app-settings.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [FormsModule, CommonModule, MatMenuModule, MatTooltipModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent extends FromInputControl implements OnInit, OnDestroy {
  dropdownOpen = false;

  dateChangeSubscribe: any;
  changesubscribe: any;
  isLoaded = false;

  constructor(
    @Self() @Optional() public control: NgControl,
    public appSetting: AppSettingsService,
    private route: ActivatedRoute
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnDestroy(): void {
    if (this.changesubscribe) {
      this.changesubscribe.unsubscribe();
    }
  }

  ngOnInit(): void {
    debugger
    this.changesubscribe = this.viewValueChange().subscribe(
      async (xValue: any) => {
        if (xValue) {
          if (this.value && this.value !== '' && typeof this.value === 'string') {
            const defaultColor = this.items.find((c: any) => c.value === this.value) || this.items[0];
            console.log(defaultColor);
            this.__label = defaultColor.label;
          }
        }
      }
    );
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectColor(item: any): void {
    this.dropdownOpen = false;
    this.value = item.value;
    this.onAction('change')
  }

}
