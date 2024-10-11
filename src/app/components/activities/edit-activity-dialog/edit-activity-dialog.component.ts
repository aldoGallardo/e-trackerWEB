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
import { ApiActivityTypesService } from 'src/app/core/services/api-activityTypes.service';
import { Activity } from 'src/app/core/models/activity.model';

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
  address: string = '';
  activityTypes: any[] = [];
  selectedBranch: any = null; // Se usará para almacenar la sucursal seleccionada
  selectedActivityType: any = null; // Se usará para almacenar el tipo de actividad seleccionada

  constructor(
    private dialogRef: MatDialogRef<EditActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiActivitiesService: ApiActivitiesService,
    private apiActivityTypesService: ApiActivityTypesService
  ) {
    this.activity = { ...data }; // Clona la actividad para edición
  }

  ngOnInit(): void {
    // Obtener sucursales
    this.apiActivitiesService.getBranches().subscribe((data: any[]) => {
      this.branches = data;
      // Seleccionar la sucursal actual
      this.selectedBranch = this.branches.find(
        (branch) => branch.id === this.activity.branchOffice
      );
    });

    // Obtener tipos de actividades
    this.apiActivityTypesService.getActivityTypes().subscribe((data: any[]) => {
      this.activityTypes = data;
      // Seleccionar el tipo de actividad actual
      this.selectedActivityType = this.activityTypes.find(
        (activityType) => activityType.id === this.activity.activityType
      );
    });
  }

  // Método para actualizar la actividad
  updateActivity(): void {
    this.apiActivitiesService
      .updateActivity(
        {
          orderNumber: this.activity.orderNumber,
          branchOffice: this.selectedBranch.id,
          address: this.activity.address,
          activityType: this.selectedActivityType.id,
        },
        this.activity.id!
      )
      .subscribe({
        next: (response) => {
          console.log('Actividad actualizada con éxito');
          this.dialogRef.close(true); // Cierra el diálogo y notifica éxito
        },
        error: (error) => {
          console.log('Error al actualizar la actividad', error);
        },
      });
  }

  // Método para cancelar y cerrar el diálogo sin hacer cambios
  onNoClick(): void {
    this.dialogRef.close();
  }
}
