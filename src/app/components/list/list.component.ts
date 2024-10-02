import { Component, Input } from '@angular/core';
import { Employee } from '../../core/models/employee.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  @Input() employees: Employee[] = [];
  displayedColumns: string[] = [
    'profilePicture',
    'name',
    'dni',
    'branchOffice',
    'userType',
    'journey',
    'contract',
  ];
}
