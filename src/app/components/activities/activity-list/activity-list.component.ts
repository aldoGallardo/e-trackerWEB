import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ApiActivitiesService } from 'src/app/core/services/api-activities.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddActivityDialogComponent } from '../add-activity-dialog/add-activity-dialog.component';
import { EditActivityDialogComponent } from '../edit-activity-dialog/edit-activity-dialog.component'; // Ajusta según la ruta

@Component({
  selector: 'app-activity-list',
  standalone: true,
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIcon,
    MatInputModule,
    HttpClientModule,
  ],
})
export class ActivityListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  length = 0;
  displayedColumns: string[] = [
    'orderNumber',
    'activityType',
    'address',
    'startedAt',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiActivitiesService: ApiActivitiesService) {} // Inyecta el servicio

  ngOnInit() {
    this.apiActivitiesService.getTotalActivities().subscribe((data: any) => {
      this.length = data.total;
    });
    this.loadActivities();
  }

  loadActivities(startAfter?: number) {
    this.apiActivitiesService.getActivities(10, startAfter).subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.log('Error al obtener actividades', error);
      },
    });
  }

  changePage(event: any) {
    this.loadActivities(event.pageIndex * 10);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddActivityDialogComponent, {
      width: '250px',
      data: { name: 'Nombre de la actividad' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(activity: any): void {
    const dialogRef = this.dialog.open(EditActivityDialogComponent, {
      width: '400px',
      data: activity, // Asegúrate de que 'activity' incluye 'id'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Recargar la lista de actividades si es necesario
        this.loadActivities();
      }
    });
  }
}
