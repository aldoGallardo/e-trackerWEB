import { Component } from '@angular/core';
import { IgxRadialGaugeModule } from 'igniteui-angular-gauges';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  standalone: true,
  imports: [IgxRadialGaugeModule, CommonModule],
})
export class ChartComponent {
  activities = [
    {
      name: 'Instalación',
      value: 90,
      minValue: 0,
      maxValue: 120,
      standard: '1:45',
      installations: '20 Instalaciones en la última semana',
      estimatedTime: 120,
      averageWeeklyTime: 90,
      evaluation: 'Excelente',
    },
    {
      name: 'Mantenimiento',
      value: 105,
      minValue: 0,
      maxValue: 110,
      standard: '1:30',
      installations: '15 Mantenimientos en la última semana',
      estimatedTime: 110,
      averageWeeklyTime: 100,
      evaluation: 'Adecuado',
    },
    {
      name: 'Inspección',
      value: 95,
      minValue: 0,
      maxValue: 100,
      standard: '2:00',
      installations: '10 Inspecciones en la última semana',
      estimatedTime: 100,
      averageWeeklyTime: 80,
      evaluation: 'Mejorable',
    },
    {
      name: 'Reparación',
      value: 115,
      minValue: 0,
      maxValue: 130,
      standard: '2:15',
      installations: '5 Reparaciones en la última semana',
      estimatedTime: 130,
      averageWeeklyTime: 120,
      evaluation: 'Mejorable',
    },
  ];

  currentActivityIndex = 0;

  get currentActivity() {
    return this.activities[this.currentActivityIndex];
  }

  get currentValue() {
    return this.currentActivity.value;
  }

  get currentMinValue() {
    return this.currentActivity.minValue;
  }

  get currentMaxValue() {
    return this.currentActivity.maxValue;
  }

  get standardTime() {
    return this.currentActivity.standard;
  }

  get currentActivityName() {
    return this.currentActivity.name;
  }

  get installationsText() {
    return this.currentActivity.installations;
  }

  get estimatedTime() {
    return this.currentActivity.estimatedTime;
  }

  get averageWeeklyTime() {
    return this.currentActivity.averageWeeklyTime;
  }

  get evaluationText() {
    const { value, estimatedTime } = this.currentActivity;
    if (value <= estimatedTime * 0.75) {
      return 'Excelente';
    } else if (value <= estimatedTime) {
      return 'Adecuado';
    } else {
      return 'Mejorable';
    }
  }

  get rangeStart() {
    return this.currentMinValue;
  }

  get rangeEnd() {
    return this.currentActivity.maxValue * 0.75;
  }

  nextActivity() {
    this.currentActivityIndex =
      (this.currentActivityIndex + 1) % this.activities.length;
  }
}
