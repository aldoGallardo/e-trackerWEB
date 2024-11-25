import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { ECharts } from 'echarts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({
        echarts: () => import('echarts'),
      }),
    },
  ],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements AfterViewInit {
  activities = [
    {
      name: 'Instalación',
      value: 90,
      minValue: 0,
      maxValue: 120,
      standard: '2:45',
      installations: '20 Instalaciones en la última semana',
      evaluation: 'Excelente',
    },
    {
      name: 'Mantenimiento',
      value: 105,
      minValue: 0,
      maxValue: 110,
      standard: '1:30',
      installations: '15 Mantenimientos en la última semana',
      evaluation: 'Adecuado',
    },
    {
      name: 'Inspección',
      value: 95,
      minValue: 0,
      maxValue: 100,
      standard: '2:00',
      installations: '10 Inspecciones en la última semana',
      evaluation: 'Mejorable',
    },
  ];

  activityDropdownOpen = false;
  currentActivityIndex = 0;

  get currentActivity() {
    return this.activities[this.currentActivityIndex];
  }

  chartOptions: any;

  chartInstance!: ECharts;

  onChartInit(ec: ECharts) {
    this.chartInstance = ec;
    window.addEventListener('resize', () => this.chartInstance.resize());
  }

  ngAfterViewInit() {
    // Simular carga de datos desde un servicio
    setTimeout(() => this.updateChart(), 0);
  }

  private needsUpdate = false;

  toggleActivityDropdown() {
    this.activityDropdownOpen = !this.activityDropdownOpen;
    this.needsUpdate = true;
  }

  ngAfterViewChecked() {
    if (this.needsUpdate) {
      this.updateChart();
      this.needsUpdate = false;
    }
  }

  selectActivity(activity: any) {
    this.currentActivityIndex = this.activities.indexOf(activity);
    this.activityDropdownOpen = false;
    this.updateChart();
  }

  updateChart() {
    // Lógica de actualización del gráfico
    const activity = this.currentActivity;
    if (
      activity.value > activity.maxValue ||
      activity.value < activity.minValue
    ) {
      console.warn('Valor fuera de rango, ajustando...');
      activity.value = Math.min(
        activity.maxValue,
        Math.max(activity.minValue, activity.value)
      );
    }

    this.chartOptions = {
      series: [
        {
          type: 'gauge',
          startAngle: 225,
          endAngle: -45,
          radius: '100%',
          pointer: { show: false },
          progress: {
            show: true,
            width: 16,
            roundCap: true,
            itemStyle: { color: '#5B6998' },
          },
          axisLine: {
            lineStyle: {
              width: 16,
              color: [
                [activity.value / activity.maxValue, '#5B6998'],
                [1, '#e5e7eb'],
              ],
              roundCap: true,
            },
          },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          detail: { show: false },
          data: [{ value: activity.value }],
        },
      ],
    };
  }

  nextActivity() {
    this.currentActivityIndex =
      (this.currentActivityIndex + 1) % this.activities.length;
    this.updateChart();
  }

  previousActivity() {
    this.currentActivityIndex =
      (this.currentActivityIndex - 1 + this.activities.length) %
      this.activities.length;
    this.updateChart();
  }
}
