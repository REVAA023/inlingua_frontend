import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { AppSettingsService } from '../../common/services/app-settings/app-settings.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AppButton } from '../core-component/core-directives.directive';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputControlComponent } from "../form-input/input-control/input-control.component";
import { FormsModule } from '@angular/forms';
import { AppSafePipe } from '../../common/pipe/app-safe/app-safe.pipe';


export interface DialogData {
  msg: string;
  confirmationText?: string;
  type: string;
  flag: boolean;
  header?: string;
  description?: string;
  items?: string[];
  otherBtnText?: string;
  closeIconHidden?: boolean;
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatSnackBarModule, MatProgressBarModule, MatDialogModule, AppButton, AppSafePipe, CommonModule, InputControlComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: DialogRef, useValue: { msg: '', confirmationText: '', type: '', flag: false, otherBtnText: '', closeIconHidden: false } },
    { provide: MAT_SNACK_BAR_DATA, useValue: { msg: '', type: '', flag: false } },
    { provide: MatSnackBarRef, useValue: { dismiss: () => { } } }
  ],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() closeIconHidden: boolean = false;
  progress: number = 100;
  responseType: string = '';
  private intervalId: ReturnType<typeof setInterval> | null = null;
  confirmationInput = '';
  errorTrue = false;

  constructor(
    @Optional() @Inject(MAT_SNACK_BAR_DATA) public snackBarData: { msg: string; type: string, flag: boolean },
    private snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData, // Use MAT_DIALOG_DATA instead of DIALOG_DATA
    @Optional() private dialogRef: MatDialogRef<AlertComponent>, // Use MatDialogRef here
    private appSettings: AppSettingsService,
    private snackBarRef: MatSnackBarRef<AlertComponent>
  ) {
    console.log(dialogData);

  }


  ngOnInit(): void {
    if (this.snackBarData?.flag) {
      this.initializeSnackbar();
      this.responseType = this.snackBarData?.type;
    } else if (this.dialogData?.flag) {
      this.responseType = this.dialogData?.type;
    } else {
      console.error('No data provided for AlertComponent');
    }
  }



  ngOnDestroy(): void {
    this.clearInterval();
  }

  dismiss(): void {
    if (this.dialogRef) {
      this.dialogRef.close(false);
    } else {
      this.snackBar.dismiss();
    }
  }

  confirm(): void {
    if (this.dialogRef) {
      this.dialogRef.close(true);
    }
  }

  onNoClick() {
    this.dialogRef.close(false);
  }


  confirmDeletion() {
    if (this.confirmationInput === this.dialogData.confirmationText) {
      this.dialogRef.close(true);
    } else {
      alert('Please type the exact confirmation text to proceed.');
      this.errorTrue = true;
    }
  }

  private initializeSnackbar(): void {
    const duration = this.appSettings.environment?.successDuration || 5000;
    this.snackBarRef.afterOpened().subscribe(() => {
      this.startProgress(duration);
    });
  }

  private startProgress(duration: number): void {
    if (duration <= 0) {
      console.error('Invalid progress duration:', duration);
      return;
    }

    const step = 100;
    const totalSteps = Math.floor(duration / step);
    const decrement = 100 / totalSteps;

    this.clearInterval();
    this.intervalId = setInterval(() => {
      this.progress = Math.max(0, this.progress - decrement);
      if (this.progress <= 0) {
        this.clearInterval();
        this.dismiss();
      }
    }, step);
  }

  private clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

