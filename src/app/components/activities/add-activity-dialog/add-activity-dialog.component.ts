import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
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
import { Activity } from 'src/app/core/models/activity.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiActivitiesService } from 'src/app/core/services/api-activities.service';
import { ActivityType } from 'src/app/core/models/activityType.model';
import { ApiActivityTypesService } from 'src/app/core/services/api-activityTypes.service';

@Component({
  selector: 'app-add-activity-dialog',
  templateUrl: './add-activity-dialog.component.html',
  styleUrls: ['./add-activity-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOption,
    MatButtonModule,
    MatDialogTitle,
    MatSelect,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class AddActivityDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddActivityDialogComponent>);
  readonly data = inject<Activity>(MAT_DIALOG_DATA);
  readonly activityType = signal(this.data.activityType);
  branches: any[] = [];
  activityTypes: any[] = [];
  orderNumber: string = '';
  selectedBranch: string = '';
  selectedActivityType: string = '';

  constructor(
    private apiActivitiesService: ApiActivitiesService,
    private apiActivityTypesService: ApiActivityTypesService
  ) {}

  ngOnInit(): void {
    this.apiActivitiesService.getBranches().subscribe((data: any[]) => {
      this.branches = data;
    });
    this.apiActivityTypesService.getActivityTypes().subscribe((data: any[]) => {
      this.activityTypes = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addActivity(
    branchOffice: string,
    activityType: string,
    orderNumber: string
  ): void {
    const activity: Activity = {
      branchOffice: this.selectedBranch,
      activityType: this.selectedActivityType,
      orderNumber: this.orderNumber,
    };
    this.apiActivitiesService.addActivity(activity).subscribe({
      next: (data: any) => {
        console.log('Actividad añadida correctamente');
        this.dialogRef.close();
      },
      error: (error) => {
        console.log('Error al añadir actividad', error);
      },
    });
  }
}
