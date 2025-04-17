import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppSettingsService } from './common/services/app-settings/app-settings.service';


export function appInitializerFactory(): () => Promise<void> {
  return async () => {
    const configService = inject(AppSettingsService);
    const [environmentConfig] = await Promise.all([
      firstValueFrom(configService.loadConfig()),
    ]);
    configService.environment = environmentConfig;
  };
}

