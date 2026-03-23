import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './Store/counter/counter.reduce';
import { amountReducer } from './Store/amount/amount.reduce';
import { openReducer } from './Store/isOpen/isOpen.reduce';
import { filterTextReducer } from './Store/filterText/filterText.reduce';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({counter:counterReducer,
      amount:amountReducer,isOpen:openReducer ,
      text:filterTextReducer
    })
],
};
