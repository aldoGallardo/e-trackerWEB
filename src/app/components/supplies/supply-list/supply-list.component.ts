import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ApiSuppliesService } from 'src/app/core/services/api-supplies.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-supply-list',
  standalone: true,
  templateUrl: './supply-list.component.html',
  styleUrls: ['./supply-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIcon,
    MatInputModule,
    HttpClientModule,
  ],
})
export class SupplyListComponent implements OnInit {
  length = 0;
  displayedColumns: string[] = ['name', 'unit', 'description'];
  dataSource = new MatTableDataSource<any>();

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiSuppliesService: ApiSuppliesService) {} // Inyecta el servicio

  ngOnInit() {
    this.apiSuppliesService.getTotalSupplies().subscribe((data: any) => {
      this.length = data.total;
    });
    this.loadSupplies();
  }

  loadSupplies(startAfter?: number) {
    this.apiSuppliesService.getSupplies(10, startAfter).subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.log('Error al obtener suministros', error);
      },
    });
  }

  changePage(event: any) {
    this.loadSupplies(event.pageIndex * 10);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
