import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-bar-chart',
  standalone: true,
  templateUrl: './report-bar-chart.component.html',
  styleUrls: ['./report-bar-chart.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  imports: [CommonModule],
})
export class ReportBarChartComponent {
  // Tiempo promedio reportado
  averageTime = '6h 30m';

  // Ubicación actual
  location = 'El Porvenir';

  // Lista de ubicaciones para el dropdown
  locations = ['El Porvenir', 'Sucursal Lima', 'Sucursal Arequipa'];

  // Estado del dropdown
  dropdownOpen = false;

  // Datos del gráfico de barras
  chartData = [
    { day: 'L', value: 40 },
    { day: 'M', value: 60 },
    { day: 'M', value: 20 },
    { day: 'J', value: 80 },
    { day: 'V', value: 60 },
    { day: 'S', value: 30 },
  ];

  // Información del pie
  branch = 'Sucursal Nuevo Cajamarca';
  employees = 6;

  // Métodos del dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLocation(loc: string) {
    this.location = loc;
    this.dropdownOpen = false; // Cierra el dropdown
  }

  // Métodos para las barras
  getBarHeight(value: number): string {
    return `${value}%`; // Altura proporcional al valor
  }
  getBarColor(value: number): string {
    if (value >= 75) {
      // Gradiente más oscuro para valores altos
      return 'linear-gradient(to left, #1B2030, #536396)';
    } else if (value >= 50) {
      // Gradiente intermedio
      return 'linear-gradient(to left, #203040, #3E5A7E)';
    } else {
      // Gradiente más claro para valores bajos
      return 'linear-gradient(to left, #2A394B, #536D91)';
    }
  }
}
