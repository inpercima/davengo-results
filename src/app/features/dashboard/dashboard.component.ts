import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { DavengoService } from '../../core/davengo.service';
import { YearRanking } from 'src/app/core/ranking.model';
import { NgIf } from '@angular/common';

@Component({
  imports: [
    MatCardModule,
    MatTableModule,
    NgIf,
  ],
  selector: 'dr-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  dataSource = new MatTableDataSource<YearRanking>();
  displayedColumns: string[] = ['column1', 'column2', 'column3'];


  constructor(private dashboardService: DavengoService) {}

  ngOnInit(): void {
    this.dashboardService.getRuns().subscribe((x) => this.dataSource = new MatTableDataSource(x));
  }
}
