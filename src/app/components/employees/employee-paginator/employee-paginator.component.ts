import { Component } from '@angular/core';
import { PaginatorComponent } from 'src/app/shared/paginator/paginator.component';

@Component({
  selector: 'app-employee-paginator',
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './employee-paginator.component.html',
  styleUrls: ['./employee-paginator.component.css'],
})
export class EmployeePaginatorComponent extends PaginatorComponent {
  // Puedes agregar lógica adicional específica si es necesario
}
