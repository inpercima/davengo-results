import { OverlayModule } from '@angular/cdk/overlay';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/app-routing';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, OverlayModule), provideRouter(ROUTES), provideAnimations(), provideHttpClient()],
}).catch((err) => console.error(err));
