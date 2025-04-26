import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';

import { AppSettingsService } from '../app-settings/app-settings.service';
import { AppService } from '../../../app.service';

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
    public appService: AppService
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
          console.log("token is missing");
          this.router.navigateByUrl('login')

        } else {
          this.token = token;
          await this.init()
          resolve(true);
        }


      } catch (error) {
        reject(error); // Reject if there's an error retrieving the token
      }
    });
  }

  async init() {
    const userData = await this.storage.get('userData');
    // console.log(userData);

    if (userData !== null || userData !== undefined) {
      this.appService.user = userData;
      console.log(this.appService.user);
    }
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

  errorMethod(err: any) {
    console.log(err, 'errorMethod');
    if (err.status === 401) {
      this.router.navigateByUrl('login')
      console.log(true);

    }
    else if (err.status === 0) {

    }
  }
}
