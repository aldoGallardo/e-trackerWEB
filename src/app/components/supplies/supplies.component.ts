import { Component, OnInit } from '@angular/core';
import { ApiSuppliesService } from '../../core/services/api-supplies.service';
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
  selector: 'app-supplies',
  standalone: true,
  imports: [
    CommonModule,
    SearchbarComponent,
    CreateButtonComponent,
    FilterComponent,
    ListComponent,
    PaginatorComponent,
  ],
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css'],
})
export class SuppliesComponent implements OnInit {
  supplies: any[] = [];
  paginatedSupplies: any[] = [];
  pageSize = 10;
  totalSupplies: number = 0;
  lastSupplyId: number | undefined = undefined;
  pageIndex = 0;

  constructor(private apiSuppliesService: ApiSuppliesService) {}

  ngOnInit(): void {
    this.apiSuppliesService.getTotalSupplies().subscribe((response: any) => {
      this.totalSupplies = response.total; // Total de suministros desde el backend
      this.loadSupplies();
    });
  }

  loadSupplies(startAfterSupplyId: number | undefined = undefined) {
    this.apiSuppliesService
      .getSupplies(this.pageSize, startAfterSupplyId)
      .subscribe(
        (data: any) => {
          if (data && data.length > 0) {
            this.supplies = data;
            this.lastSupplyId = data[data.length - 1].supplyId;
            this.paginatedSupplies = data;
          }
        },
        (error) => {
          console.error('Error al obtener los suministros', error);
        }
      );
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    const startAfter = this.pageIndex === 0 ? undefined : this.lastSupplyId;

    this.loadSupplies(startAfter);
  }

  filterSupplies(query: string) {
    this.paginatedSupplies = this.supplies.filter((supply) =>
      supply.name.toLowerCase().includes(query.toLowerCase())
    );
    this.totalSupplies = this.paginatedSupplies.length;
  }
}
