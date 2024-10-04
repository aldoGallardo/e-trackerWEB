import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';
import { ListComponent } from 'src/app/shared/list/list.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  @Input() employees: Employee[] = [];
  columnsConfig = [
    { key: 'profilePicture', header: '', type: 'image' }, // Indicar que es una imagen
    { key: 'name', header: 'Nombre' },
    { key: 'dni', header: 'DNI' },
    { key: 'branchOffice', header: 'Sucursal' },
    { key: 'userType', header: 'Tipo de Usuario' },
    { key: 'journey', header: 'Jornada' },
    { key: 'contract', header: 'Contrato' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
