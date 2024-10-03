import { Component, OnInit } from '@angular/core';
import { ApiEmployeesService } from '../../core/services/api-employees.service';
import { Employee } from '../../core/models/employee.model';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CreateButtonComponent } from '../create-button/create-button.component';
import { FilterComponent } from '../filter/filter.component';
import { ListComponent } from '../list/list.component';
import {
  PaginatorComponent,
  PageEvent,
} from '../paginator/paginator.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    SearchbarComponent,
    CreateButtonComponent,
    FilterComponent,
    ListComponent,
    PaginatorComponent,
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  pageSize = 10;
  totalEmployees: number = 0;
  lastUserNumber: number | undefined = undefined;
  pageIndex = 0;

  constructor(private apiEmployeesService: ApiEmployeesService) {}

  ngOnInit(): void {
    this.apiEmployeesService.getTotalUsers().subscribe((response: any) => {
      this.totalEmployees = response.total; // Total de empleados desde el backend
      this.loadUsers();
    });
  }

  loadUsers(startAfterUserNumber: number | undefined = undefined) {
    this.apiEmployeesService
      .getEmployees(this.pageSize, startAfterUserNumber)
      .subscribe(
        (data: any) => {
          if (data && data.length > 0) {
            this.employees = data;
            this.lastUserNumber = data[data.length - 1].userNumber;
            this.paginatedEmployees = data;
          }
        },
        (error) => {
          console.error('Error al obtener los empleados', error);
        }
      );
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const startAfter = this.pageIndex === 0 ? undefined : this.lastUserNumber;

    this.loadUsers(startAfter);
  }

  filterEmployees(query: string) {
    this.paginatedEmployees = this.employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query.toLowerCase()) ||
        employee.dni.includes(query)
    );
    this.totalEmployees = this.paginatedEmployees.length;
  }
}
