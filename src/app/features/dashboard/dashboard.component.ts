import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, mergeAll, mergeMap, toArray } from 'rxjs';
import { Ranking } from 'src/app/core/ranking.model';
import { DavengoService } from '../../core/davengo.service';

@Component({
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule, NgIf, ReactiveFormsModule],
  selector: 'dr-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
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
      .subscribe((ranking) => (this.dataSource = new MatTableDataSource(ranking)));
  }
}
