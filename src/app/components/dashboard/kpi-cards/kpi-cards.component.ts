import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kpi-cards.component.html',
  styleUrls: ['./kpi-cards.component.css'],
})
export class KpiCardsComponent {
  // Lista de KPI simulada
  kpis = Array.from({ length: 20 }, (_, i) => ({
    name: `KPI ${i + 1}`,
    value: Math.floor(Math.random() * 100),
    icon: 'trending_up',
    dimension:
      i % 3 === 0 ? 'operational' : i % 3 === 1 ? 'financial' : 'customer',
    place: i % 2 === 0 ? 'El Porvenir' : 'Centro',
  }));

  // Propiedades de configuración
  activeIndex = 0;
  selectedDimension: string = 'all';
  selectedPlace: string = 'El Porvenir';
  dimensionDropdownOpen = false;
  timeDropdownOpen = false;

  // Dimensiones disponibles para filtrar
  dimensions = [
    { label: 'Todas las dimensiones', value: 'all' },
    { label: 'Operacional', value: 'operational' },
    { label: 'Financiera', value: 'financial' },
    { label: 'Cliente', value: 'customer' },
  ];

  // Opciones de tiempo (vista)
  views = [
    { label: 'Diario', value: 'daily' },
    { label: 'Semanal', value: 'weekly' },
    { label: 'Mensual', value: 'monthly' },
    { label: 'Anual', value: 'yearly' },
  ];
  currentView: string = 'monthly';

  /**
   * Obtiene los KPI filtrados por dimensión y lugar.
   */
  get filteredKpis() {
    return this.kpis.filter(
      (kpi) =>
        (this.selectedDimension === 'all' ||
          kpi.dimension === this.selectedDimension) &&
        (this.selectedPlace === 'all' || kpi.place === this.selectedPlace)
    );
  }

  /**
   * Obtiene la etiqueta de la dimensión seleccionada.
   */
  get selectedDimensionLabel(): string {
    const dimension = this.dimensions.find(
      (d) => d.value === this.selectedDimension
    );
    return dimension ? dimension.label : 'Todas las dimensiones';
  }

  /**
   * Alterna la visibilidad del dropdown de dimensiones.
   */
  toggleDimensionDropdown(): void {
    this.dimensionDropdownOpen = !this.dimensionDropdownOpen;
  }

  /**
   * Selecciona una dimensión y cierra el dropdown.
   */
  selectDimension(dimensionValue: string): void {
    this.selectedDimension = dimensionValue;
    this.dimensionDropdownOpen = false;
  }

  /**
   * Alterna la visibilidad del dropdown de tiempo.
   */
  toggleTimeDropdown(): void {
    this.timeDropdownOpen = !this.timeDropdownOpen;
  }

  /**
   * Selecciona una vista de tiempo.
   */
  selectView(view: { label: string; value: string }): void {
    this.currentView = view.value;
    this.timeDropdownOpen = false;
  }

  /**
   * Obtiene la etiqueta de la vista de tiempo seleccionada.
   */
  getCurrentViewLabel(): string {
    return this.views.find((v) => v.value === this.currentView)?.label || '';
  }

  /**
   * Cambia al siguiente grupo de KPI en el carrusel.
   */
  nextGroup(): void {
    const maxIndex = Math.max(0, this.filteredKpis.length - 5);
    this.activeIndex = Math.min(this.activeIndex + 1, maxIndex);
  }

  /**
   * Cambia al grupo anterior de KPI en el carrusel.
   */
  previousGroup(): void {
    this.activeIndex = Math.max(this.activeIndex - 1, 0);
  }

  /**
   * Alterna los colores de fondo de las tarjetas basado en su posición.
   */
  getCardColor(index: number): string {
    const colors = ['bg-gray-100', 'bg-blue-50', 'bg-blue-100'];
    return colors[index % colors.length];
  }
}
