// data.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { AppService } from '../../../app.service';
import { AlertComponent } from '../../../app-core/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
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
          console.log("token is missing");
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
      console.log(this.appService.user);
    }
  }

  // Fixed success message method
  successMessage(msg: string, successType: 'success' | 'error' | 'warning' | 'info' = 'success') {
    console.log('Showing success message:', msg, successType);

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
    debugger
  console.log(err, 'errorMethod');

  if (err.status === 401) {
    this.router.navigateByUrl('login');
    console.log('Unauthorized - redirecting to login');
  } else if (err.status === 404) {
    // Handle not found errors
    this.errorMessage(err.error.message || 'Resource not found');
  }
  else if (err.status === 0) {
    // Handle network errors
    this.errorMessage(err.error.message || 'Network error, please check your connection');
  } else if (err.status === 400) {
    // Handle bad request
    this.errorMessage(err.error.message || 'Bad request, please check your input');
  } else if (err.status === 500) {
    // Handle server errors
    this.errorMessage(err.error.message || 'Internal server error, please try again later');
  } else {
    // Handle other errors
    this.errorMessage(err.error.message || 'An unexpected error occurred');
  }
}
}
