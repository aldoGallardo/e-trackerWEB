import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-button',
  standalone: true,
  imports: [],
  templateUrl: './create-button.component.html',
  styleUrl: './create-button.component.css',
})
export class CreateButtonComponent {
  @Input() buttonLabel: string = 'Agregar'; // Puede personalizar el label del botón
  @Input() icon: string = 'plus'; // Puedes cambiar el icono si es necesario
}
