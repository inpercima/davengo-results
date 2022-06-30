import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppRoutingPipe } from './app-routing.pipe';
import { FeaturesModule } from './features/features.module';
import { MaterialModule } from './shared/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatTabsModule,
    OverlayModule,
    AppRoutingModule,
    FeaturesModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
