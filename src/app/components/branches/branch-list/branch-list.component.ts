import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Branch } from '@core/models/branch.model';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css'],
})
export class BranchListComponent {
  @Input() branches: Branch[] = [];
  @Output() edit = new EventEmitter<Branch>();
  @Output() delete = new EventEmitter<number>();

  columnsConfig = [{ key: 'name', header: 'Nombre' }];

  editBranch(branch: Branch): void {
    this.edit.emit(branch);
  }

  deleteBranch(branchId: number): void {
    this.delete.emit(branchId);
  }
}
