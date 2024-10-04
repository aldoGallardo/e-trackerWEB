import { Component, OnInit } from '@angular/core';
import { ApiBranchesService } from '../../core/services/api-branches.service';
import { Branch } from '../../core/models/branch.model'; // Modelo de Sucursales
import { SearchbarComponent } from '../../shared/searchbar/searchbar.component';
import { CreateButtonComponent } from '../../shared/create-button/create-button.component';
import { FilterComponent } from '../../shared/filter/filter.component';
import { ListComponent } from '../../shared/list/list.component';
import {
  PaginatorComponent,
  PageEvent,
} from '../../shared/paginator/paginator.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [
    CommonModule,
    SearchbarComponent,
    CreateButtonComponent,
    FilterComponent,
    ListComponent,
    PaginatorComponent,
  ],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent implements OnInit {
  branches: Branch[] = [];
  paginatedBranches: Branch[] = [];
  pageSize = 10;
  totalBranches: number = 0;
  lastBranchId: number | undefined = undefined;
  pageIndex = 0;

  constructor(private apiBranchesService: ApiBranchesService) {}

  ngOnInit(): void {
    this.apiBranchesService.getTotalBranches().subscribe((response: any) => {
      this.totalBranches = response.total; // Total de sucursales desde el backend
      this.loadBranches();
    });
  }

  loadBranches(startAfterBranchId: number | undefined = undefined) {
    this.apiBranchesService
      .getBranches(this.pageSize, startAfterBranchId)
      .subscribe(
        (data: any) => {
          if (data && data.length > 0) {
            this.branches = data;
            this.lastBranchId = data[data.length - 1].branchId;
            this.paginatedBranches = data;
          }
        },
        (error) => {
          console.error('Error al obtener las sucursales', error);
        }
      );
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    const startAfter = this.pageIndex === 0 ? undefined : this.lastBranchId;

    this.loadBranches(startAfter);
  }

  filterBranches(query: string) {
    this.paginatedBranches = this.branches.filter((branch) =>
      branch.name.toLowerCase().includes(query.toLowerCase())
    );
    this.totalBranches = this.paginatedBranches.length;
  }
}
