import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FullSpinnerService } from './full-spinner.service';

@Injectable()
export class FullSpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly fullSpinner: FullSpinnerService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let spinnerSubscription: Subscription;
    if (req.headers.has('Spinner')) {
      if(req.headers.get('Spinner') === 'true'){
        spinnerSubscription = this.fullSpinner.emptySpinner.subscribe();
      }
    }
    let auth: any = req.headers.has('Authorization') ? req.headers.get('Authorization') : '';
    const newRequest = req.clone({
      headers: new HttpHeaders({
        'Authorization': auth,
        "ngrok-skip-browser-warning": "69420",
      })
    })
    return next.handle(newRequest).pipe(
      finalize(() => {
        if (spinnerSubscription) {
          spinnerSubscription.unsubscribe();
        }
      })
    );
  }
}
