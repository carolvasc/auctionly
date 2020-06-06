import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export class IAppConfig {
  apiUrl: string;
};

export const appConfig: IAppConfig = {
  apiUrl: environment.apiUrl,
};