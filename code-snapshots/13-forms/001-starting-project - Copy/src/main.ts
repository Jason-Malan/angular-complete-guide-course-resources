import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';
import { LoginReactiveComponent } from './app/auth/login-reactive/login-reactive.component';
import { provideZoneChangeDetection, ApplicationConfig } from '@angular/core';
import { SignupComponent } from './app/auth/signup/signup.component';

const routes: Routes = [
  { path: 'login-template', component: LoginComponent },
  { path: 'login-reactive', component: LoginReactiveComponent },
  { path: 'signup', component: SignupComponent },
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
