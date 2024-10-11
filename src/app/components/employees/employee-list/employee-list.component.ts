import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ApiEmployeesService } from 'src/app/core/services/api-employees.service';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
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
export class EmployeeListComponent implements OnInit {
  length = 0;
  displayedColumns: string[] = [
    'profilePicture',
    'name',
    'dni',
    'branchOffice',
    'userType',
    'journey',
    'contract',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiEmployeesService: ApiEmployeesService,
    private router: Router
  ) {} // Inyectar el Router

  ngOnInit() {
    this.apiEmployeesService.getTotalUsers().subscribe((data: any) => {
      this.length = data.total;
    });
    this.loadEmployees();
  }

  loadEmployees(startAfter?: number) {
    this.apiEmployeesService.getEmployees(10, startAfter).subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.log('Error al obtener empleados', error);
      },
    });
  }

  changePage(event: any) {
    this.loadEmployees(event.pageIndex * 10);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para redirigir al formulario de creación de empleado
  goToCreateEmployeeForm() {
    this.router.navigate(['/create-employee']); // Ruta hacia el formulario
  }
}
