import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../core/services/api.service';
import { Employee } from '../../core/models/employee.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CreateButtonComponent } from '../create-button/create-button.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    MatTableModule,
    NavbarComponent,
    SearchbarComponent,
    CreateButtonComponent,
    FilterComponent,
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  displayedColumns: string[] = [
    'profilePicture',
    'name',
    'dni',
    'branchOffice',
    'userType',
    'journey',
    'contract',
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.apiService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        this.filteredEmployees = [...this.employees]; // Inicialmente mostrar todos
        console.log(this.employees);
      },
      (error) => {
        console.error('Error al obtener los empleados', error);
      }
    );
  }

  // Método para filtrar empleados según búsqueda
  filterEmployees(query: string) {
    this.filteredEmployees = this.employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query.toLowerCase()) ||
        employee.dni.includes(query)
    );
  }
}
