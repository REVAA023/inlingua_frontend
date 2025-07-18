// data.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { AppService } from '../../../app.service';
import { AlertComponent, DialogData } from '../../../app-core/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {
  token = '';
  message: any;
  showErrorMessage = false;
  onDialogClosedSubscriber: any;
  basePath = '';
  isLoading = false;

  constructor(
    private router: Router,
    private storage: StorageService,
    public appService: AppService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.clearMessageBox();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.onDialogClosedSubscriber) {
      this.onDialogClosedSubscriber.unsubscribe();
    }
  }

  serviceStarted() {
    this.isLoading = true;
  }

  serviceCompleted() {
    this.isLoading = false;
  }

  clearMessageBox() {
    this.message = {};
    this.showErrorMessage = false;
  }

  async getToken() {
    const token = await this.storage.get('token');
    if (token && token !== '') {
      this.token = token;
    } else {
      this.navigateToLogin();
    }
  }

  navigateToLogin() {
    this.router.navigateByUrl('/');
  }

  async checkToken(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await this.storage.get('token');
        if (!token) {
          this.dialog.open(AlertComponent, {
            data: <DialogData>{
              msg: 'Please upload Class Record Video',
              type: 'sessionAlert',
              flag: true,
              header: 'Missing Document',
              confirmationText: '',
              closeIconHidden: false,
            },
            disableClose: true,
            hasBackdrop: true
          });
          this.router.navigateByUrl('login');
        } else {
          this.token = token;
          await this.init();
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async init() {
    const userData = await this.storage.get('userData');
    if (userData !== null && userData !== undefined) {
      this.appService.user = userData;
    }
  }

  // Fixed success message method
  successMessage(msg: string, successType: 'success' | 'error' | 'warning' | 'info' = 'success') {

    const snackBarRef = this.snackBar.openFromComponent(AlertComponent, {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom', // Changed to top for better visibility
      data: {
        msg: msg,
        type: successType,
        flag: true
      },
      panelClass: ['custom-snackbar-container']
    });

    // Optional: Handle snackbar close events
    snackBarRef.afterDismissed().subscribe(() => {
    });

    return snackBarRef;
  }

  // Additional method for error messages
  errorMessage(msg: string) {
    return this.successMessage(msg, 'error');
  }

  // Additional method for warning messages
  warningMessage(msg: string) {
    return this.successMessage(msg, 'warning');
  }

  // Additional method for info messages
  infoMessage(msg: string) {
    return this.successMessage(msg, 'info');
  }

  errorMethod(err: any) {

    if (err.status === 401) {
      this.router.navigateByUrl('login');
    }

    else if (err.status === 404) {
      this.errorMessage(err.error.message);
    }

    else if (err.status === 0) {
      this.errorMessage(err.error.message);
    }

    else if (err.status === 400) {
      this.errorMessage(err.error.message);
    }

    else if (err.status === 500) {
      this.errorMessage(err.error.message);
    }

    else {
      this.errorMessage(err.error.message);
    }
  }
}
