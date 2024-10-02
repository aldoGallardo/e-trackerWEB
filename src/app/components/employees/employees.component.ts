import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../core/services/api.service';
import { Employee } from '../../core/models/employee.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [MatTableModule, NavbarComponent],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
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
        console.log(this.employees);
      },
      (error) => {
        console.error('Error al obtener los empleados', error);
      }
    );
  }
}
