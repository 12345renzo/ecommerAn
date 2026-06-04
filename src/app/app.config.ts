import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { withDevtools } from '@tanstack/angular-query-experimental/devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideTanStackQuery(new QueryClient(), withDevtools()), 
    provideClientHydration(withEventReplay())
  ]
};
