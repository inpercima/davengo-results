import { type AfterViewInit, Component, type OnInit, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Chart, type ChartConfiguration, registerables } from 'chart.js';
import type { AppResult } from '../../core/app-result';
import { DavengoService } from '../../core/davengo.service';

Chart.register(...registerables);

@Component({
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatTableModule, ReactiveFormsModule],
  selector: 'dr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private davengoService = inject(DavengoService);

  loading = false;
  initialSearch = false;
  form!: FormGroup;

  dataSource = new MatTableDataSource<AppResult>();
  displayedColumns: string[] = ['year', 'name', 'teamName', 'rank', 'nettoTime'];

  lineChart!: Chart<'line'>;

  lineChartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      datasets: [
        {
          data: [],
          label: 'Davengo data',
          tension: 0.5
        },
      ],
      labels: [],
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: function (val) {
              // Hide every 2nd tick label
              return `${(Number(val) / 60).toFixed(2)} min`;
            },
          },
        },
      },
    },
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      differentLastName: [''],
    });
  }

  ngAfterViewInit(): void {
    this.lineChart = new Chart('lineChart', this.lineChartConfig);
  }

  onSubmit(): void {
    this.initialSearch = true;
    this.loading = true;
    this.dataSource = new MatTableDataSource();

    this.davengoService
      .fetchAll(this.form.value.firstName, this.form.value.lastName, this.form.value.differentLastName)
      .subscribe((appResult) => {
        this.dataSource = new MatTableDataSource(appResult);
        this.loading = false;
        this.lineChartConfig.data.labels = appResult.map((result) => result.year);
        this.lineChartConfig.data.datasets[0].data = appResult.map((result) => this.#convertTimeToTimestamp(result.nettoTime));
        this.lineChart.update();
      });
  }

  #convertTimeToTimestamp(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
}
