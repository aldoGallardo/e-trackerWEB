import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'; // Importar para el modal
import { FormsModule } from '@angular/forms';
import { ApiBranchesService } from '@core/services/api-branches.service';
import { Branch } from '@core/models/branch.model';
import { CreateBranchFormComponent } from '../create-branch-form/create-branch-form.component';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css'],
})
export class BranchListComponent implements OnInit {
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
    this.paginateBranches();
  }

  paginateBranches(): void {
    const startIndex = this.pageIndex * this.pageSize;
    this.filteredBranches = this.branches.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
}
