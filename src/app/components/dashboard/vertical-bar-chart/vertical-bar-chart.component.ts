import { Component } from '@angular/core';
import {
  IgxCategoryChartComponent,
  IgxLegendComponent,
  IgxCategoryChartModule,
  IgxLegendModule,
} from 'igniteui-angular-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vertical-bar-chart',
  standalone: true,
  imports: [CommonModule, IgxCategoryChartModule, IgxLegendModule],
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css'],
})
export class VerticalBarChartComponent {
  // Definimos el modo de vista actual y el conjunto de datos
  currentView: 'monthly' | 'quarterly' | 'yearly' = 'monthly';
  activityData: any[] = [];

  // Datos para diferentes vistas
  monthlyData = [
    { month: 'Ene', activities: 18 },
    { month: 'Feb', activities: 30 },
    { month: 'Mar', activities: 16 },
    { month: 'Abr', activities: 17 },
    { month: 'May', activities: 19 },
    { month: 'Jun', activities: 15 },
    { month: 'Jul', activities: 18 },
    { month: 'Ago', activities: 27 },
    { month: 'Sep', activities: 16 },
    { month: 'Oct', activities: 25 },
    { month: 'Nov', activities: 17 },
    { month: 'Dic', activities: 29 },
  ];

  quarterlyData = [
    { quarter: 'Q1', activities: 64 },
    { quarter: 'Q2', activities: 51 },
    { quarter: 'Q3', activities: 61 },
    { quarter: 'Q4', activities: 71 },
  ];

  yearlyData = [
    { year: '2020', activities: 230 },
    { year: '2021', activities: 240 },
    { year: '2022', activities: 255 },
    { year: '2023', activities: 247 },
  ];

  constructor() {
    this.updateData();
  }

  // Función para cambiar la vista
  toggleView() {
    if (this.currentView === 'monthly') {
      this.currentView = 'quarterly';
    } else if (this.currentView === 'quarterly') {
      this.currentView = 'yearly';
    } else {
      this.currentView = 'monthly';
    }
    this.updateData();
  }

  // Actualizar los datos según la vista seleccionada
  updateData() {
    if (this.currentView === 'monthly') {
      this.activityData = this.monthlyData;
    } else if (this.currentView === 'quarterly') {
      this.activityData = this.quarterlyData;
    } else {
      this.activityData = this.yearlyData;
    }
  }
}
