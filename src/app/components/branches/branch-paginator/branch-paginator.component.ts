import { Component } from '@angular/core';
import { PaginatorComponent } from 'src/app/shared/paginator/paginator.component';

@Component({
  selector: 'app-branch-paginator',
  standalone: true,
  imports: [PaginatorComponent],
  template: '<app-paginator></app-paginator>',
  styleUrls: ['./branch-paginator.component.css'],
})
export class BranchPaginatorComponent extends PaginatorComponent {}
