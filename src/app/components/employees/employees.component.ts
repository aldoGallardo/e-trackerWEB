import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ApiEmployeesService } from '@core/services/api-employees.service';
import { Employee } from '@core/models/employee.model';
import { EmployeeListComponent } from 'src/app/components/employees/employee-list/employee-list.component';
import { FormsModule } from '@angular/forms';
import { EmployeeSearchbarComponent } from './employee-searchbar/employee-searchbar.component';
import { EmployeeFilterComponent } from './employee-filter/employee-filter.component';
import { EmployeePaginatorComponent } from './employee-paginator/employee-paginator.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    EmployeeListComponent,
    EmployeeFilterComponent,
    EmployeePaginatorComponent,
    EmployeeSearchbarComponent,
    FormsModule,
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  totalEmployees: number = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private apiEmployeesService: ApiEmployeesService) {}

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phoneNumber',
    'actions',
  ];

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.apiEmployeesService.getEmployees(10).subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
        this.filteredEmployees = employees; // Inicialmente se muestran todos
        this.totalEmployees = employees.length;
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  filterEmployees(query: string): void {
    if (query) {
      this.filteredEmployees = this.employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(query.toLowerCase()) ||
          employee.dni.includes(query)
      );
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  handlePageEvent(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    // Aquí podrías ajustar la lógica para manejar la paginación real
  }

  deleteEmployee(id: number): void {
    this.apiEmployeesService.deleteEmployee(id).subscribe(
      () => {
        this.loadEmployees(); // Reload employees after deletion
      },
      (error: any) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
}
