import { Component, Output, EventEmitter } from '@angular/core';
import { FilterComponent } from 'src/app/shared/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-filter',
  standalone: true,
  imports: [FilterComponent, FormsModule, CommonModule],
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css'],
})
export class EmployeeFilterComponent {
  @Output() filterChange = new EventEmitter<string>();

  applyEmployeeFilter(event: string) {
    this.filterChange.emit(event); // Emitir el filtro seleccionado
  }
}
