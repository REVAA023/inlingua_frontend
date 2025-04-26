import { ApplicationConfig, importProvidersFrom, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInitializerFactory } from './app.config.initializer';
import { fullSpinnerInterceptor } from './common/full-spinner/full-spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([fullSpinnerInterceptor])),
    provideAppInitializer(appInitializerFactory()),
  ]
};
