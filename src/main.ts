import { OverlayModule } from '@angular/cdk/overlay';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { FeaturesModule } from './app/features/features.module';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, OverlayModule, AppRoutingModule, FeaturesModule), provideAnimations()],
}).catch((err) => console.error(err));
