import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiEmployeesService } from '@core/services/api-employees.service';
import { Employee } from '@core/models/employee.model';
import { Branch } from '@core/models/branch.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-create-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './create-employee-form.component.html',
  styleUrls: ['./create-employee-form.component.css'],
})
export class CreateEmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  branches: Branch[] = [];

  constructor(
    private fb: FormBuilder,
    private apiEmployeesService: ApiEmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      profilePicture: [''],
      phoneNumber: ['', Validators.required],
      dni: ['', Validators.required],
      birthDate: ['', Validators.required],
      branchOffice: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['', Validators.required],
    });

    this.apiEmployeesService.getBranches().subscribe(
      (branches: Branch[]) => {
        this.branches = branches;
      },
      (error: any) => {
        console.error('Error al obtener sucursales:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      this.apiEmployeesService.addEmployee(newEmployee).subscribe(
        (response: any) => {
          this.router.navigate(['/employees']);
        },
        (error: any) => {
          console.error('Error al agregar empleado', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
