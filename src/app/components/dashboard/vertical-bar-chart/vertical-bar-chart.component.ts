import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// Registra los módulos necesarios de ECharts
echarts.use([BarChart, TooltipComponent, GridComponent, CanvasRenderer]);

@Component({
  selector: 'app-vertical-bar-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css'],
})
export class VerticalBarChartComponent {
  chartOptions: any = {}; // Configuración inicial del gráfico
  dropdownOpen = false;
  currentView: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'yearly' =
    'monthly';
  activityData: any[] = [];

  views = [
    { label: 'Semanal', value: 'weekly' },
    { label: 'Mensual', value: 'monthly' },
    { label: 'Cuatrimestral', value: 'quarterly' },
    { label: 'Semestral', value: 'semiannual' },
    { label: 'Anual', value: 'yearly' },
  ];

  weeklyData = [
    { label: 'Lunes', activities: 5 },
    { label: 'Martes', activities: 8 },
    { label: 'Miércoles', activities: 6 },
    { label: 'Jueves', activities: 7 },
    { label: 'Viernes', activities: 9 },
    { label: 'Sábado', activities: 4 },
    { label: 'Domingo', activities: 3 },
  ];

  monthlyData = [
    { label: 'Ene', activities: 18 },
    { label: 'Feb', activities: 30 },
    { label: 'Mar', activities: 16 },
    { label: 'Abr', activities: 17 },
    { label: 'May', activities: 19 },
    { label: 'Jun', activities: 15 },
    { label: 'Jul', activities: 18 },
    { label: 'Ago', activities: 27 },
    { label: 'Sep', activities: 16 },
    { label: 'Oct', activities: 25 },
    { label: 'Nov', activities: 17 },
    { label: 'Dic', activities: 29 },
  ];

  quarterlyData = [
    { label: 'Q1', activities: 64 },
    { label: 'Q2', activities: 51 },
    { label: 'Q3', activities: 61 },
    { label: 'Q4', activities: 71 },
  ];

  semiannualData = [
    { label: '1er Semestre', activities: 110 },
    { label: '2do Semestre', activities: 120 },
  ];

  yearlyData = [
    { label: '2020', activities: 230 },
    { label: '2021', activities: 240 },
    { label: '2022', activities: 255 },
    { label: '2023', activities: 247 },
  ];

  places = [
    { label: 'Porvenir', value: 'porvenir' },
    { label: 'Natasha', value: 'natasha' },
    { label: 'Nuevo Cajamarca', value: 'nuevoCajamarca' },
  ];

  constructor() {
    this.updateData();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectView(view: { label: string; value: string }) {
    this.currentView = view.value as
      | 'weekly'
      | 'monthly'
      | 'quarterly'
      | 'semiannual'
      | 'yearly';
    this.dropdownOpen = false;
    this.updateData();
  }

  updateData() {
    let xAxisName = '';
    switch (this.currentView) {
      case 'weekly':
        this.activityData = this.weeklyData;
        xAxisName = 'Días';
        break;
      case 'monthly':
        this.activityData = this.monthlyData;
        xAxisName = 'Meses';
        break;
      case 'quarterly':
        this.activityData = this.quarterlyData;
        xAxisName = 'Cuatrimestres';
        break;
      case 'semiannual':
        this.activityData = this.semiannualData;
        xAxisName = 'Semestres';
        break;
      case 'yearly':
        this.activityData = this.yearlyData;
        xAxisName = 'Años';
        break;
    }

    this.chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      xAxis: {
        type: 'category',
        data: this.activityData.map((item) => item.label),
        name: xAxisName,
        nameLocation: 'middle', // Ubicación del nombre
        nameGap: 30, // Espaciado del nombre
        nameTextStyle: {
          color: '#28303f', // Cambia este valor al color deseado
          fontFamily: 'Poppins',
          bold: true,
          fontSize: 16,
        },
        axisLine: {
          lineStyle: { color: '#D0D3D9', fontFamily: 'Poppins' },
        },
        axisLabel: { color: '#6B7280', fontFamily: 'Poppins' },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#D0D3D9' } },
        axisLabel: { color: '#6B7280', fontFamily: 'Poppins' },
      },
      series: [
        {
          type: 'bar',
          data: this.activityData.map((item) => item.activities),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#1B2030' },
              { offset: 1, color: '#536396' },
            ]),
            borderRadius: [5, 5, 0, 0],
          },
          barWidth: '50%',
        },
      ],
    };
  }

  getCurrentViewLabel(): string {
    const view = this.views.find((v) => v.value === this.currentView);
    return view ? view.label : '';
  }
}
