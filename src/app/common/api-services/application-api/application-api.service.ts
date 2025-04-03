import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { DataService } from '../../services/data/data.service';
import { ApiDataService } from "../../api-services/api-data.service";
import { AppSettingsService } from '../../services/app-settings/app-settings.service';

@Injectable({
  providedIn: "root",
})
export class ApplicationApiService {

  constructor(private data: DataService, private apiData: ApiDataService, private appSettings: AppSettingsService) { }

  getToken(options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData.getData(this.appSettings.environment.applicationPath + 'getToken', options).pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
  }

  userDetails(options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData.getData(this.appSettings.environment.applicationPath + 'userdetails', options).pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
  }

  searchAgentContact(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(this.appSettings.environment.applicationPath + 'ExternalPortal/Agent/SearchAgentContact', body, options)
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
          return throwError(() => new Error(err));
        })
      );
  }

  validateLogin(body: any, options?: any): Observable<any> {
    this.data.serviceStarted();
    options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
    return this.apiData
      .postData(this.appSettings.environment.applicationPath + 'login', body, options)
      .pipe(
        finalize(() => this.data.serviceCompleted()),
        catchError((err) => {
          options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
          return throwError(() => new Error(err));
        })
      );
  }

}
