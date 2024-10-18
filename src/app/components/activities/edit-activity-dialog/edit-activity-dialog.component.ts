import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiActivitiesService } from 'src/app/core/services/api-activities.service';
import { ApiBranchesService } from 'src/app/core/services/api-branches.service';
import { ApiActivityTypesService } from 'src/app/core/services/api-activityTypes.service';
import { Activity } from 'src/app/core/models/activity.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-activity-dialog',
  standalone: true,
  templateUrl: './edit-activity-dialog.component.html',
  styleUrls: ['./edit-activity-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatOption,
    MatSelect,
    HttpClientModule,
    CommonModule,
  ],
})
export class EditActivityDialogComponent implements OnInit {
  activity: Activity;
  branches: any[] = [];
  activityTypes: any[] = [];
  selectedBranch: any = null;
  selectedActivityType: any = null;

  constructor(
    private dialogRef: MatDialogRef<EditActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiActivitiesService: ApiActivitiesService,
    private apiBranchesService: ApiBranchesService,
    private apiActivityTypesService: ApiActivityTypesService
  ) {
    this.activity = { ...data };
  }

  ngOnInit(): void {
    this.loadBranches();
    this.loadActivityTypes();
  }

  loadBranches(): void {
    this.apiBranchesService
      .getBranches(10)
      .pipe(
        catchError((error) => {
          console.error('Error al cargar sucursales', error);
          return of([]);
        })
      )
      .subscribe((data: any[]) => {
        this.branches = data;
        this.selectedBranch = this.branches.find(
          (branch) => branch.id === this.activity.branchOffice
        );
      });
  }

  loadActivityTypes(): void {
    this.apiActivityTypesService
      .getActivityTypes()
      .pipe(
        catchError((error) => {
          console.error('Error al cargar tipos de actividad', error);
          return of([]);
        })
      )
      .subscribe((data: any[]) => {
        this.activityTypes = data;
        this.selectedActivityType = this.activityTypes.find(
          (type) => type.id === this.activity.activityType
        );
      });
  }

  updateActivity(): void {
    if (
      !this.selectedBranch ||
      !this.selectedBranch.id ||
      !this.selectedActivityType ||
      !this.selectedActivityType.id
    ) {
      console.error('Faltan datos para actualizar la actividad.');
      return;
    }

    const updatedActivity: Activity = {
      id: this.activity.id,
      orderNumber: this.activity.orderNumber,
      branchOffice: this.selectedBranch.id,
      address: this.activity.address,
      activityType: this.selectedActivityType.id,
    };

    this.apiActivitiesService
      .updateActivity(updatedActivity)
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar la actividad', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          console.log('Actividad actualizada con éxito');
          this.dialogRef.close(true);
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
