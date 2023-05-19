import { Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: environment.defaultRoute,
  },
  {
    component: DashboardComponent,
    path: environment.defaultRoute,
  },
];
