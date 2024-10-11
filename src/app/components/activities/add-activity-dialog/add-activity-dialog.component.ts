import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
  branches: any[] = [];
  activityTypes: any[] = [];
  selectedBranch: any = null;
  selectedActivityType: any = null; // Ahora seleccionaremos el objeto completo
  orderNumber: string = '';
  address: string = '';

  constructor(
    private apiActivitiesService: ApiActivitiesService,
    private apiActivityTypesService: ApiActivityTypesService
  ) {}

  ngOnInit(): void {
    // Obtener sucursales y tipos de actividades
    this.apiActivitiesService.getBranches().subscribe((data: any[]) => {
      this.branches = data;
      console.log('Sucursales:', this.branches); // Verificar las sucursales
    });
    this.apiActivitiesService.getActivityTypes().subscribe((data: any[]) => {
      this.activityTypes = data;
      console.log('Tipos de actividades:', this.activityTypes); // Verificar los tipos de actividades
    });
  }

  // Cerrar el diálogo sin hacer nada
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Agregar una nueva actividad
  addActivity(): void {
    const activity: Activity = {
      branchOffice: this.selectedBranch,
      activityType: this.selectedActivityType, // Aquí asegúrate de que sea un string
      orderNumber: this.orderNumber,
      address: this.address,
    };

    console.log('Activity to be added:', activity); // Verifica que el activityType no esté vacío y sea string

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
