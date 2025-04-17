import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, catchError, interval, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {

  private settingsSubject = new BehaviorSubject<any>(null);

  public environment: any = {};

  constructor(private http: HttpClient) {

   }

  loadConfig() {
    let d = new Date();
    let n = d.getTime();
    return this.http.get('./app.settings.json?v=' + n);
  }

  public get settingsChanges(): Observable<any> {
    return this.settingsSubject.asObservable();
  }
}
