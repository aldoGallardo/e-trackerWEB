import { Component, Output, EventEmitter } from '@angular/core';

import { FilterComponent } from 'src/app/shared/filter/filter.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-filter',
  standalone: true,
  imports: [FilterComponent, FormsModule],
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css'],
})
export class EmployeeFilterComponent {
  selectedFilter: string = '';

  @Output() filterChange = new EventEmitter<string>(); // Cambiar el nombre del evento

  onFilterChange() {
    this.filterChange.emit(this.selectedFilter); // Emitir el filtro seleccionado
  }
}
