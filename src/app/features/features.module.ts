import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, FeaturesRoutingModule, DashboardComponent],
})
export class FeaturesModule {}
