import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesComponent } from '../employees/employees.component';

@Component({
  selector: 'app-create-button',
  standalone: true,
  imports: [EmployeesComponent],
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.css'], // Corregido a styleUrls
})
export class CreateButtonComponent {
  @Input() buttonLabel: string = 'Agregar'; // Puede personalizar el label del botón
  @Input() icon: string = 'plus'; // Puedes cambiar el icono si es necesario

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
