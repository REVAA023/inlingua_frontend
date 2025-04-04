import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';

import { AppSettingsService } from '../app-settings/app-settings.service';

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
    private snackBar: MatSnackBar,
    private storage: StorageService,
    private appSetting: AppSettingsService
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
          // this.confirmSessionOut();
        } else {
          this.token = token;
          resolve(true);
        }

      } catch (error) {
        reject(error); // Reject if there's an error retrieving the token
      }
    });
  }

  // successMessage(msg: any, successType: any = 'Success') {
  //   this.snackBar.openFromComponent(SuccessInfoComponent, {
  //     duration: 3000, // Duration in milliseconds
  //     horizontalPosition: 'right', // Horizontal position of the snackbar
  //     verticalPosition: 'bottom', // Vertical position of the snackbar
  //     data: {
  //       msg: msg,
  //       type: successType,
  //     },
  //     panelClass: ['custom-snackbar'], // Custom CSS class for styling
  //   });
  // }
}
