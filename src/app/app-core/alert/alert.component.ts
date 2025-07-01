// alert.component.ts
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
import { Subscription } from 'rxjs';

// Enhanced interface with type safety
export interface DialogData {
  msg: string;
  confirmationText?: string;
  type: 'delete' | 'submitAlert' | 'alertMsg' | 'sessionAlert';
  flag: boolean;
  header?: string;
  description?: string;
  items?: string[];
  otherBtnText?: string;
  closeIconHidden?: boolean;
}

export interface SnackBarData {
  msg: string;
  type: 'success' | 'error' | 'warning' | 'info';
  flag: boolean;
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatSnackBarModule, MatProgressBarModule, MatDialogModule, AppButton, AppSafePipe, CommonModule, InputControlComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() closeIconHidden: boolean = false;

  progress: number = 100;
  responseType: string = '';
  confirmationInput = '';
  errorTrue = false;

  // Component mode flags
  readonly isSnackbarMode: boolean;
  readonly isDialogMode: boolean;

  // Private properties for cleanup
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private subscriptions: Subscription[] = [];

  // Getters for template to ensure type safety
  get safeDialogData(): DialogData {
    return this.dialogData || {
      msg: '',
      type: 'alertMsg' as const,
      flag: false
    };
  }

  get safeSnackBarData(): SnackBarData {
    return this.snackBarData || {
      msg: '',
      type: 'info' as const,
      flag: false
    };
  }

  constructor(
    @Optional() @Inject(MAT_SNACK_BAR_DATA) public snackBarData: SnackBarData | null,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData | null,
    @Optional() private dialogRef: MatDialogRef<AlertComponent> | null,
    @Optional() private appSettings: AppSettingsService | null,
    @Optional() private snackBarRef: MatSnackBarRef<AlertComponent> | null
  ) {
    // Determine component mode during construction
    this.isSnackbarMode = !!this.snackBarData;
    this.isDialogMode = !!this.dialogData;

    // Debug logging
    console.log('AlertComponent initialized:', {
      isSnackbarMode: this.isSnackbarMode,
      isDialogMode: this.isDialogMode,
      snackBarData: this.snackBarData,
      dialogData: this.dialogData
    });
  }

  ngOnInit(): void {
    if (this.isSnackbarMode && this.snackBarData) {
      this.responseType = this.snackBarData.type;
      this.initializeSnackbar();
    } else if (this.isDialogMode && this.dialogData) {
      this.responseType = this.dialogData.type;
    } else {
      console.error('No valid data provided for AlertComponent');
    }
  }

  ngOnDestroy(): void {
    this.clearProgressInterval();
    this.subscriptions.forEach(sub => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
    this.subscriptions = [];
  }

  private clearProgressInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  dismiss(): void {
    this.clearProgressInterval();
    if (this.isDialogMode && this.dialogRef) {
      this.dialogRef.close(false);
    } else if (this.isSnackbarMode && this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  confirm(): void {
    this.clearProgressInterval();
    if (this.dialogRef) {
      this.dialogRef.close(true);
    }
  }

  onNoClick(): void {
    this.clearProgressInterval();
    if (this.dialogRef) {
      this.dialogRef.close(false);
    }
  }

  confirmDeletion(): void {
    const confirmationText = this.safeDialogData.confirmationText;
    if (!confirmationText) {
      this.confirm();
      return;
    }

    const userInput = this.confirmationInput.trim();
    const requiredText = confirmationText.trim();

    if (userInput === requiredText) {
      this.confirm();
    } else {
      this.errorTrue = true;
      console.warn('Confirmation text mismatch:', { userInput, requiredText });
    }
  }

  private initializeSnackbar(): void {
    if (!this.snackBarRef) {
      console.error('SnackBarRef is not available');
      return;
    }

    // Get duration from app settings or use default
    const duration = this.appSettings?.environment?.successDuration || 5000;

    // Start progress immediately
    setTimeout(() => {
      this.startProgress(duration);
    }, 100);
  }

  private startProgress(duration: number): void {
    if (duration <= 0) {
      console.error('Invalid progress duration:', duration);
      return;
    }

    this.clearProgressInterval();

    const updateInterval = 50;
    const decrement = (100 * updateInterval) / duration;

    this.intervalId = setInterval(() => {
      this.progress = Math.max(0, this.progress - decrement);

      if (this.progress <= 0) {
        this.clearProgressInterval();
        this.dismiss();
      }
    }, updateInterval);
  }
}
