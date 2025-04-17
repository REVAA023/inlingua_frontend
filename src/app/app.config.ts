import { ApplicationConfig, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { appInitializerFactory } from './app.config.initializer';
import { FullSpinnerInterceptor } from './common/full-spinner/full-spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FullSpinnerInterceptor,
      multi: true
    },
    provideAppInitializer(appInitializerFactory()),
  ]
};
