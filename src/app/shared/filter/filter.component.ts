import { Component, Output, EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() filter = new EventEmitter<string>();
  filterForm: FormGroup;

  filterOptions = [
    { label: 'Todos', value: '' },
    { label: 'Administradores', value: 'admin' },
    { label: 'Técnicos', value: 'technician' },
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      selectedFilter: [''],
    });
  }

  applyFilter(): void {
    const value = this.filterForm.get('selectedFilter')?.value || '';
    this.filter.emit(value);
  }
}
