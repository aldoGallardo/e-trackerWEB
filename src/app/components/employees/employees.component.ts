import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Employee } from '../../core/models/employee.model';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CreateButtonComponent } from '../create-button/create-button.component';
import { FilterComponent } from '../filter/filter.component';
import { ListComponent } from '../list/list.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    SearchbarComponent,
    CreateButtonComponent,
    FilterComponent,
    ListComponent,
    MatPaginatorModule,
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
  usersData: Employee[][] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Cargar usuarios con paginación
  loadUsers(startAfterUserNumber: number | undefined = undefined) {
    this.apiService.getEmployees(this.pageSize, startAfterUserNumber).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.employees = data;
          this.totalEmployees = data.total || 0;
          this.lastUserNumber = data[data.length - 1].userNumber; // Último usuario de la página
          this.usersData.push(data); // Guarda la página actual
          this.paginatedEmployees = data;
        }
      },
      (error) => {
        console.error('Error al obtener los empleados', error);
      }
    );
  }

  // Función para cargar la página siguiente
  loadNextPage() {
    this.loadUsers(this.lastUserNumber);
  }

  // Función para cargar la página anterior
  loadPreviousPage() {
    if (this.usersData.length > 1) {
      this.usersData.pop(); // Remueve la página actual
      const previousPage = this.usersData[this.usersData.length - 1];
      this.paginatedEmployees = previousPage;
      this.lastUserNumber = previousPage[previousPage.length - 1].userNumber; // Actualiza el último número
    }
  }

  // Filtrar empleados
  filterEmployees(query: string) {
    this.paginatedEmployees = this.employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query.toLowerCase()) ||
        employee.dni.includes(query)
    );
  }
}
