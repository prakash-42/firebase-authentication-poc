import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Obtain this config from firebase console
const firebaseConfig = {
  apiKey: "AIzxxxxxxxxxxxxxxxxxxxxxxxxxxxx_o",
  authDomain: "test-xxxxxx.firebaseapp.com",
  projectId: "test-xxxxxx",
  storageBucket: "test-xxxxxx.appspot.com",
  messagingSenderId: "200000000000007",
  appId: "1:200000000000007:web:3xxxxxxxxxxxxxxxxxac",
  measurementId: "G-XXXXXXXXX1T"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(()  => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth())
    ]),
  ],
};
