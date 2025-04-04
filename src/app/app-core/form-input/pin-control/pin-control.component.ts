import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, Self, Optional, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { FromInputControl } from '../form-input-control';
import { FormsModule, NgControl } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { NoEmojiDirective } from '../form-directive/no-emoji/no-emoji.directive';
import { PinNumberOnlyDirective } from '../form-directive/pin-number-only/pin-number-only.directive';

@Component({
  selector: 'app-pin-control',
  templateUrl: './pin-control.component.html',
  styleUrls: ['./pin-control.component.scss'],
  imports: [FormsModule, NgClass, NoEmojiDirective, PinNumberOnlyDirective, NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  providers: [],
})
export class PinControlComponent extends FromInputControl implements OnInit {
  @Input() boxes: any = '4';
  sets: any = [];
  timeLeft: number = 30;
  @Input() isEyeIcon = false;
  @Input() hideStar = false;
  interval: any;
  constructor(@Self() @Optional() public control: NgControl) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit() {
    this.setValidate(this.control);
    this.generatePNR();
    this.generateBoxes();
    this.startTimer();
  }

  generateBoxes() {
    for (let i = 0; i < parseFloat(this.boxes); i++) {
      const obj = {
        value: '',
        id: this.addOnID + i,
        nextid: this.addOnID + (i + 1),
        previd: i === 0 ? '' : this.addOnID + (i - 1),
      };
      this.sets.push(obj);
    }
  }



  ngAfterViewInit() {

  }


  setValueFn() {
    let value = '';
    this.sets.forEach((element: any) => {
      if (element.value !== '') {
        value = value + element.value.toString();
      }
    });
    this.value = value;
    if (this.value.length === parseFloat(this.boxes)) {
      this.onChange.emit();
      // this.onFinished.emit();
    }

  }
  clear() {
    this.sets = [];
    for (let i = 0; i < parseFloat(this.boxes); i++) {
      const obj = {
        value: '',
        id: this.addOnID + i,
        nextid: this.addOnID + (i + 1),
      };
      this.sets.push(obj);
    }
    this.value = '';
  }


  async startTimer() {
    this.interval = await setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      if (this.interval === this.timeLeft) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
