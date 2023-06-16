import { Component, OnInit } from '@angular/core';

import { DavengoService } from '../../core/davengo.service';

@Component({
  selector: 'dr-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DavengoService) {}

  ngOnInit(): void {
    this.dashboardService.getRuns().subscribe((x) => console.log(x));
  }
}
