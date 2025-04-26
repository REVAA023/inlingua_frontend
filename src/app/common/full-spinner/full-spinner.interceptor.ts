import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { FullSpinnerService } from './full-spinner.service';
import { finalize } from 'rxjs/operators';

export const fullSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const fullSpinner = inject(FullSpinnerService);

  let spinnerSubscription: any;
  if (req.headers.has('Spinner') && req.headers.get('Spinner') === 'true') {
    spinnerSubscription = fullSpinner.emptySpinner.subscribe();
  }

  let auth = req.headers.get('Authorization') || '';

  const newRequest = req.clone({
    headers: req.headers.set('Authorization', auth).set('ngrok-skip-browser-warning', '69420')
  });

  return next(newRequest).pipe(
    finalize(() => {
      if (spinnerSubscription) {
        spinnerSubscription.unsubscribe();
      }
    })
  );
};
