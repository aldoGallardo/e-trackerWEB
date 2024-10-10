import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIcon],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columnsConfig: { key: string; header: string; type?: string }[] = [];

  displayedColumnKeys: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columnsConfig'] && changes['columnsConfig'].currentValue) {
      this.displayedColumnKeys = this.columnsConfig.map((col) => col.key);
    }
    if (changes['data'] && changes['data'].currentValue) {
      // Verifica si hay datos y si son correctos
      console.log('Data passed to list:', this.data);
    }
  }

  isImageColumn(column: any): boolean {
    return column.type === 'image';
  }
}
