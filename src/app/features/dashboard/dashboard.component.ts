import { Component, type OnInit, inject } from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import type { AppResult } from '../../core/app-result';
import { DavengoService } from '../../core/davengo.service';

@Component({
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatTableModule, ReactiveFormsModule],
  selector: 'dr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private davengoService = inject(DavengoService);

  loading = false;
  initialSearch = false;
  form!: FormGroup;

  dataSource = new MatTableDataSource<AppResult>();
  displayedColumns: string[] = ['year', 'name', 'teamName', 'rank', 'nettoTime'];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      differentLastName: [''],
    });
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
      });
  }
}
