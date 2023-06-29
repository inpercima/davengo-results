import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { map, mergeAll, mergeMap, toArray } from 'rxjs';
import { Ranking } from 'src/app/core/ranking.model';
import { DavengoService } from '../../core/davengo.service';

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    NgIf,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  selector: 'dr-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  /** form */
  initialSearch = false;
  loading = false;
  form!: FormGroup;

  /** table */
  dataSource = new MatTableDataSource<Ranking>();
  displayedColumns: string[] = ['year', 'name', 'teamName', 'rank', 'nettoTime'];

  /** chart */
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  chartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Firmenlauf',
      },
    ],
    labels: [],
  };
  chartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            return new Date(Number(value) * 1000).toISOString().substring(11, 19);
          },
          stepSize: 60,
        },
      },
    },
  };

  constructor(private formBuilder: FormBuilder, private dashboardService: DavengoService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.onSubmit();
  }

  onSubmit(): void {
    this.initialSearch = true;
    this.loading = true;
    this.dataSource = new MatTableDataSource();
    this.dashboardService
      .getRuns(this.form.value.firstName, this.form.value.lastName)
      .pipe(
        mergeMap((yearRankings) => yearRankings),
        map((yearRanking) => {
          const ranking = yearRanking.rankings;
          ranking.forEach((ranking) => (ranking.year = yearRanking.year));
          return ranking;
        }),
        mergeAll(),
        toArray()
      )
      .subscribe((ranking) => {
        this.createChart(ranking);
        this.dataSource = new MatTableDataSource(ranking);
        this.loading = false;
      });
  }

  private createChart(ranking: Ranking[]): void {
    this.chartData.datasets[0].data = [];
    this.chartData.labels = [];
    for (const entry of ranking) {
      let [hours, minutes, seconds] = entry.nettoTime.split(':');
      this.chartData.datasets[0].data.push(Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds));
      this.chartData.labels!.push(entry.year);
    }
    this.chart?.update();
  }
}
