import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideTanStackQuery } from '@tanstack/angular-query-experimental';
import { QueryClient } from '@tanstack/query-core';
import { withDevtools } from '@tanstack/angular-query-experimental/devtools';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
    provideTanStackQuery(new QueryClient(), withDevtools()), 
    provideClientHydration(withEventReplay()),
    provideAnimations(), // requerido
    provideToastr(),
  ]
};
