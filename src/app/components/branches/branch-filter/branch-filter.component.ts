import { Component, Output, EventEmitter } from '@angular/core';
import { FilterComponent } from 'src/app/shared/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branch-filter',
  standalone: true,
  imports: [FilterComponent, FormsModule, CommonModule],
  templateUrl: './branch-filter.component.html',
  styleUrls: ['./branch-filter.component.css'],
})
export class BranchFilterComponent {
  @Output() filterChange = new EventEmitter<string>();

  applyBranchFilter(event: string) {
    this.filterChange.emit(event); // Emitir el filtro seleccionado
  }
}
