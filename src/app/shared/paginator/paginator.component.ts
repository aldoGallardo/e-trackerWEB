import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  standalone: true,
  imports: [MatPaginatorModule],
})
export class PaginatorComponent {
  @Input() length!: number;
  @Input() pageSize!: number;
  @Input() pageIndex!: number;
  @Output() pageChange = new EventEmitter<any>();

  onPageChange(event: any) {
    this.pageChange.emit(event);
  }
}
