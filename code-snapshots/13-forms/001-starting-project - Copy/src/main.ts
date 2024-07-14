import {
  ApplicationConfig,
  bootstrapApplication,
} from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';
import { LoginReactiveComponent } from './app/auth/login-reactive/login-reactive.component';
import { provideZoneChangeDetection } from '@angular/core';

const routes: Routes = [
  { path: 'login-template', component: LoginComponent },
  { path: 'login-reactive', component: LoginReactiveComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
