import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  standalone: true,
  imports: [MatPaginatorModule],
})
export class PaginatorComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Output() pageChange = new EventEmitter<PageEvent>();

  handlePageEvent(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
