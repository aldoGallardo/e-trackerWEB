import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ApiAssignmentsService } from 'src/app/core/services/api-assignments.service';
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

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.css',
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
export class AssignmentListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  length = 0;
  employees: any[] = [];
  displayedColumns: string[] = [
    'orderNumber',
    'assignFrom',
    'assignTo',
    'assignmentDate',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiAssignmentsService: ApiAssignmentsService) {} // Inyecta el servicio

  ngOnInit(): void {
    // Obtener sucursales y tipos de actividades
    this.apiAssignmentsService.getTotalAssignments().subscribe((data: any) => {
      this.length = data.total;
    });
    this.loadAssignments();
    this.apiAssignmentsService.getEmployees().subscribe((data: any) => {
      this.employees = data;
      console.log(data);
    });
  }

  loadAssignments(startAfter?: number) {
    this.apiAssignmentsService.getAssignments(10, startAfter).subscribe({
      next: (data: any) => {
        this.dataSource.data = data.map((assignment: any) => {
          // Convertir los campos de fecha
          if (assignment.assignmentDate && assignment.assignmentDate._seconds) {
            assignment.assignmentDate = new Date(
              assignment.assignmentDate._seconds * 1000
            );
          }
          if (assignment.startedAt && assignment.startedAt._seconds) {
            assignment.startedAt = new Date(
              assignment.startedAt._seconds * 1000
            );
          }
          if (assignment.completedAt && assignment.completedAt._seconds) {
            assignment.completedAt = new Date(
              assignment.completedAt._seconds * 1000
            );
          }
          return assignment;
        });
      },
      error: (error) => {
        console.log('Error al obtener asignaciones', error);
      },
    });
  }

  changePage(event: any) {
    this.loadAssignments(event.pageIndex * 10);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(AddActivityDialogComponent, {
  //     width: '250px',
  //     data: { name: 'Nombre de la actividad' },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //   });
  // }

  // openEditDialog(activity: any): void {
  //   const dialogRef = this.dialog.open(EditActivityDialogComponent, {
  //     width: '400px',
  //     data: activity,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.loadAssignments();
  //     }
  //   });
  // }
}
