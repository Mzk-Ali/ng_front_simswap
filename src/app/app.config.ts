import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import MyPreset from './mypreset';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
        routes,
        withInMemoryScrolling({
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled'
        })
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    MessageService,
    ConfirmationService,
    providePrimeNG({
            theme: {
                preset: MyPreset,
                options: {
                    ripple: true,
                    inputStyle: 'outlined',
                    darkModeSelector: false,
                }
            },
            zIndex: {
                modal: 1100,    // dialog, sidebar
                overlay: 1000,  // dropdown, overlaypanel
                menu: 1000,     // overlay menus
                tooltip: 1100   // tooltip
            }
        })
  ]
};
