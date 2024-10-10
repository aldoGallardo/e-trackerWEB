import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'; // Importar para el modal
import { FormsModule } from '@angular/forms';
import { ApiBranchesService } from '@core/services/api-branches.service';
import { Branch } from '@core/models/branch.model';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchSearchbarComponent } from './branch-searchbar/branch-searchbar.component';
import { BranchFilterComponent } from './branch-filter/branch-filter.component';
import { BranchPaginatorComponent } from './branch-paginator/branch-paginator.component';
import { CreateBranchFormComponent } from './create-branch-form/create-branch-form.component';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIcon,
    BranchListComponent,
    BranchFilterComponent,
    BranchPaginatorComponent,
    BranchSearchbarComponent,
    FormsModule,
  ],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent implements OnInit {
  branches: Branch[] = [];
  filteredBranches: Branch[] = [];
  totalBranches: number = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private apiBranchesService: ApiBranchesService,
    private dialog: MatDialog // Para manejar el modal
  ) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.apiBranchesService.getBranches(10).subscribe(
      (branches: Branch[]) => {
        this.branches = branches;
        this.filteredBranches = branches;
        this.totalBranches = branches.length;
      },
      (error: any) => {
        console.error('Error fetching branches:', error);
      }
    );
  }

  filterBranches(query: string): void {
    if (query) {
      this.filteredBranches = this.branches.filter((branch) =>
        branch.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredBranches = this.branches;
    }
  }

  openCreateBranchModal(): void {
    const dialogRef = this.dialog.open(CreateBranchFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.loadBranches(); // Recargar la lista después de crear
      }
    });
  }

  handlePageEvent(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  deleteBranch(id: number): void {
    this.apiBranchesService.deleteBranch(id).subscribe(() => {
      this.loadBranches();
    });
  }
}
