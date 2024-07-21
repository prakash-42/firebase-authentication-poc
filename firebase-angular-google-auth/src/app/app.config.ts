import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Obtain this config from firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAZRQLeCF2vezwJJp9_SwvTUsSBY-h7M_o",
  authDomain: "test-pkt-e99b4.firebaseapp.com",
  projectId: "test-pkt-e99b4",
  storageBucket: "test-pkt-e99b4.appspot.com",
  messagingSenderId: "24678923717",
  appId: "1:24678923717:web:6677a012e09e7887661fac",
  measurementId: "G-SDSF3TS133"
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
