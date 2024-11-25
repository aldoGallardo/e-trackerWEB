import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';
import { KpiCardsComponent } from './kpi-cards/kpi-cards.component';
import { OkrTableComponent } from './okr-table/okr-table.component';
import { ReportBarChartComponent } from './report-bar-chart/report-bar-chart.component';
import { ActivitiesComponent } from '../activities/activities.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartComponent,
    OkrTableComponent,
    VerticalBarChartComponent,
    KpiCardsComponent,
    ReportBarChartComponent,
    ActivitiesComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  toggleTheme() {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark');
  }

  // Agregar más KPIs al array
  kpis = Array.from({ length: 20 }, (_, i) => ({
    name: `KPI ${i + 1}`,
    value: Math.floor(Math.random() * 100), // Valor aleatorio entre 0 y 100
    icon: 'insights',
    color: `bg-blue-${100 + (i % 9) * 100}`, // Diferentes tonos de azul
  }));
}
