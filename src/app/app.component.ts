import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';

import { NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppRoutingPipe } from './app-routing.pipe';
import { FeaturesRoutingModule } from './features/features-routing.module';

@Component({
  selector: 'dr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatTabsModule, NgFor, RouterLinkActive, RouterLink, RouterOutlet, AppRoutingPipe],
})
export class AppComponent {
  public appname: string;

  public routes: Routes;

  // Adds the custom theme to the app root.
  @HostBinding('class') class = `${environment.theme}-theme`;

  public constructor(private titleService: Title, public overlayContainer: OverlayContainer) {
    this.appname = environment.appname;
    this.routes = AppRoutingModule.ROUTES;
    this.routes = this.routes.concat(FeaturesRoutingModule.ROUTES);
    this.titleService.setTitle(this.appname);
    // Adds the custom theme to dialogs.
    this.overlayContainer.getContainerElement().classList.add(`${environment.theme}-theme`);
  }
}
