import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, interval, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {

  private settingsSubject = new BehaviorSubject<any>(null);

  private readonly SETTINGS_URL = './app.settings.json';
  private readonly FORMS_DATA_URL = './app.formsList.json';
  private readonly COUNTRY_DATA_URL = './app.country.json';
  public environment: any = {};
  public FormData: any = {};
  public countryData: any = [];

  constructor(private http: HttpClient) {
    // this.pollSettings();
   }

  pollSettings() {
    interval(3000)
      .pipe(
        switchMap(() => this.loadConfig()), 
        catchError(error => {
          console.error('Error fetching settings', error);
          return [];
        })
      )
      .subscribe(newSettings => {
        const currentSettings = this.settingsSubject.value;
        if (JSON.stringify(currentSettings) !== JSON.stringify(newSettings)) {
          this.settingsSubject.next(newSettings);
          this.environment = newSettings;
        }
      });
  }


  public get settingsChanges(): Observable<any> {
    return this.settingsSubject.asObservable();
  }

  loadConfig(): Observable<any> {
    return this.loadJsonFile<any>(this.SETTINGS_URL);
  }

  loadFormsData(): Observable<any> {
    return this.loadJsonFile<any>(this.FORMS_DATA_URL);
  }

  loadCountryData(): Observable<any> {
    return this.loadJsonFile<any>(this.COUNTRY_DATA_URL);
  }

  private loadJsonFile<T>(url: string): Observable<T> {
    const timestamp = new Date().getTime();
    return this.http.get<T>(`${url}?v=${timestamp}`).pipe(
      catchError(error => {
        console.error(`Failed to load config from ${url}`, error);
        return of({} as T);  // Return an empty object on error
      })
    );
  }
}
