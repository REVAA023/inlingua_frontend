import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';

import { AppSettingsService } from '../app-settings/app-settings.service';
import { AppService } from '../../../app.service';
import { AlertComponent } from '../../../app-core/alert/alert.component';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {

  token = '';
  showErrorMessage = false;
  onDialogClosedSubscriber: any;
  basePath = '';
  isLoading = false;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private storage: StorageService,
    private appSetting: AppSettingsService,
    private appService: AppService,
    private coreService: CoreService
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

  errorMethod(err: any) {
    console.log(err);
    
    switch (err.status) {
      case 0:
        if (err.statusText === 'Unknown Error') {
          this.internalServerError('');
        }
        break;
      case 404:
        this.internalServerError(this.appSetting.environment.httpErrorMsg.error404);
        break;
      case 400:
        // this.message = err.error;
        // this.coreService.errorMessageOnly(this.message);
        // this.showErrorMessage = true;
        break;
      case 401:
        this.confirmSessionOut();
        break;
      case 500:
        this.internalServerError(err.error);
        break;
      case 501:
        this.internalServerError(err.error);
        break;
      case 503:
        this.internalServerError(err.error);
        break;
      default:
        break;
    }
  }

  async internalServerError(msg: any) {
    let xMsg = '';
    msg !== '' && msg != null
      ? (xMsg = msg)
      : (xMsg = this.appSetting.environment.httpErrorMsg.default);
    // this.coreService.notificationDialog(xMsg);
  }
  async confirmSessionOut() {
    debugger
    let xMsg = this.appSetting.environment.httpErrorMsg.error401;
    var response = await this.coreService.openSessionAlertDialog(xMsg);
    if (response) {
      this.router.navigateByUrl('/');
    }
  }

  errorMessageOnly(msg: any) {
    this.constructErrorMsg(msg);
  }

  constructErrorMsg(val: any) {
    // this.message.errorMessage = [];
    const obj = {
      msgID: 0,
      msgType: 2,
      msgDescription: val,
    };
    // this.message.errorMessage.push(obj);
    // this.coreService.errorMessageOnly(this.message);
  }

  singleErrorMsgOnly(val: any) {
    // this.coreService.singleErrorMessageOnly(val);
  }

  accountLock(val: any) {
    // this.coreService.singleErrorMessageAccLock(val);
  }

  clearMessageBox() {
    // this.message = new entIEMessage();
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
    await this.init();
    return new Promise(async (resolve, reject) => {
      try {
        const token = await this.storage.get('token');

        if (!token) {
          this.confirmSessionOut();
        } else {
          this.token = token;
          resolve(true);
        }

      } catch (error) {
        reject(error); // Reject if there's an error retrieving the token
      }
    });
  }

  async init() {
    await this.storage.get('userData').then((success: any) => {
      if (success !== undefined || success !== null) {
        this.appService.userData = success;
      }
    })
  }

  successMessage(msg: any) {
    this.coreService.showSuccessMessage(msg)
  }
}
