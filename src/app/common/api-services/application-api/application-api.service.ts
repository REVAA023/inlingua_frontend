import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DataService } from '../../services/data/data.service';
import { ApiDataService } from '../../api-services/api-data.service';
import { AppSettingsService } from '../../services/app-settings/app-settings.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApiService {
  constructor(
    private data: DataService,
    private apiData: ApiDataService,
    private appSettings: AppSettingsService
  ) { }

  importLeads(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'import-lead',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  getToken(options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .getData(
        this.appSettings.environment.applicationPath + 'get-token',
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  checkPassswordToken(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'check-password-token',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  setPassword(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'create-new-password',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  getStudentCounselors(options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .getData(
        this.appSettings.environment.applicationPath + 'student-counselors',
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  login(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'login',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  getLanguage(options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .getData(
        this.appSettings.environment.applicationPath + 'show-languages',
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  getStudentDetailsChoices(options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .getData(
        this.appSettings.environment.applicationPath + 'student-details-choices',
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  getLevelAndHours(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'show-level-and-hour',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  otpSender(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'otp-sender',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  studentAccountVerification(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'student-account-verify',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  getAllStudentDetails(options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .getData(
        this.appSettings.environment.applicationPath + 'get-all-student-details',
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  getStudentDetails(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'student-profile',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  changeStudentStatus(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'student-status-update',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  getLeads(options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .getData(
        this.appSettings.environment.applicationPath + 'get-all-leads',
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  getLeadDetails(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'lead-profile',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  getStudentAndTrainer(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'get-students-and-trainers',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  // Trainers

  getTrainers(options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .getData(
        this.appSettings.environment.applicationPath + 'get-trainers',
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  createTrainer(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'create-trainer',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  // Batches
  getBatches(options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .getData(
        this.appSettings.environment.applicationPath + 'get-batch',
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

  createBatch(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(
        this.appSettings.environment.applicationPath +
        'create-batch',
        body,
        options
      )
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(() => new Error(err));
        })
      );
  }

}
