import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { map, mergeAll, mergeMap, toArray } from 'rxjs';
import { DavengoService } from '../../core/davengo.service';
import { Ranking } from '../../core/ranking.model';

@Component({
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatTableModule, ReactiveFormsModule],
  selector: 'dr-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loading = false;
  initialSearch = false;
  form!: FormGroup;

  dataSource = new MatTableDataSource<Ranking>();
  displayedColumns: string[] = ['year', 'name', 'teamName', 'rank', 'nettoTime'];

  constructor(private formBuilder: FormBuilder, private dashboardService: DavengoService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
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
        this.dataSource = new MatTableDataSource(ranking);
        this.loading = false;
      });
  }
}
