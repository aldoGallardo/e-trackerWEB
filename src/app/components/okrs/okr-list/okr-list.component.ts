import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiOkrService } from 'src/app/core/services/api-okr.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-okr-list',
  standalone: true,
  templateUrl: './okr-list.component.html',
  imports: [CommonModule, MatButtonModule],
})
export class OkrListComponent {
  okrs: any[] = []; // Lista de OKRs con sus KR y KPI
  constructor(
    private apiOkrService: ApiOkrService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadOkrs();
  }
  loadOkrs(): void {
    this.apiOkrService.getAllOkrs().subscribe({
      next: (data) => {
        this.okrs = data.map((okr: any) => ({
          ...okr,
          keyResults: okr.keyResults
            ? okr.keyResults.map((kr: any) => ({
                ...kr,
                kpi: {
                  title: kr.kpiTitle,
                  meta: kr.kpiMeta,
                },
              }))
            : [],
        }));
      },
      error: (error) => console.error('Error al cargar OKRs', error),
    });
  }
  deleteOKR(id: string): void {
    this.apiOkrService.deleteOkr(id).subscribe({
      next: () => this.loadOkrs(),
      error: (error) => console.error('Error al eliminar OKR', error),
    });
  }
}
