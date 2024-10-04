import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, CommonModule],
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
  }

  isImageColumn(column: any): boolean {
    return column.type === 'image';
  }
}
