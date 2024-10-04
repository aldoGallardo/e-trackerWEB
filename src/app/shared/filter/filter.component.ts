import { Component, Output, EventEmitter } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatPaginatorModule, MatLabel, MatSelectModule, MatOptionModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @Output() filter = new EventEmitter<string>();
  filterOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  applyFilter(event: any) {
    this.filter.emit(event.value);
  }
}
