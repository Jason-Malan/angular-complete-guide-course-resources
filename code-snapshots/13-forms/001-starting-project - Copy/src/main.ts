import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';
import { LoginReactiveComponent } from './app/auth/login-reactive/login-reactive.component';

const routes: Routes = [
  { path: 'login-template', component: LoginComponent },
  { path: 'login-reactive', component: LoginReactiveComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
