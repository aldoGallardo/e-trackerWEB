import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.css'],
})
export class CreateButtonComponent {
  @Input() buttonLabel: string = 'Agregar'; // Personaliza el texto del botón
  @Input() icon: string = 'plus'; // Personaliza el icono

  constructor(private router: Router) {}

  // Navegar a la ruta especificada
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
