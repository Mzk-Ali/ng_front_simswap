import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    ripple: true,
                    inputStyle: 'outlined',
                    darkModeSelector: false
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
