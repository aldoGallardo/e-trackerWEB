import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatChipListbox } from '@angular/material/chips';
import { IBaseChipEventArgs } from 'igniteui-angular';

@Component({
  selector: 'app-okr-chips',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule, MatChipListbox],
  templateUrl: './okr-chips.component.html',
  styleUrls: ['./okr-chips.component.css'],
})
export class OkrChipsComponent {
  dimensions = [
    'Eficiencia en la Ejecución de Tareas',
    'Eficiencia en el Uso de Recursos',
    'Reducción de Tiempo de Resolución',
    'Optimización en el Uso de Suministros',
    'Puntualidad en la Ejecución de Tareas',
    'Tasa de Reportabilidad',
    'Satisfacción del Cliente',
    'Tiempo de Inactividad',
  ];

  actions = ['Aumentar', 'Reducir', 'Mantener'];
  metrics: string[] = [];
  goals = ['≥90%', '≥95%', '10%', '5%'];
  timeframes = ['1 mes', '3 meses', '6 meses', '1 año'];

  selectedDimension: string | null = null;
  selectedAction: string | null = null;
  selectedMetric: string | null = null;
  selectedGoal: string | null = null;
  selectedTimeframe: string | null = null;

  get assembledOKR(): string {
    return `${this.selectedAction} ${this.selectedDimension} usando ${this.selectedMetric} con una meta de ${this.selectedGoal} en un plazo de ${this.selectedTimeframe}`;
  }

  selectDimension(dimension: string) {
    this.selectedDimension = dimension;
    // Cargar métricas basadas en la dimensión seleccionada
    this.metrics = this.getMetricsForDimension(dimension);
    this.resetSelections(['action', 'metric', 'goal', 'timeframe']);
  }

  selectAction(action: string) {
    this.selectedAction = action;
    this.resetSelections(['metric', 'goal', 'timeframe']);
  }

  selectMetric(metric: string) {
    this.selectedMetric = metric;
    this.resetSelections(['goal', 'timeframe']);
  }

  selectGoal(goal: string) {
    this.selectedGoal = goal;
    this.resetSelections(['timeframe']);
  }

  selectTimeframe(timeframe: string) {
    this.selectedTimeframe = timeframe;
  }

  resetSelections(levels: string[]) {
    if (levels.includes('action')) this.selectedAction = null;
    if (levels.includes('metric')) this.selectedMetric = null;
    if (levels.includes('goal')) this.selectedGoal = null;
    if (levels.includes('timeframe')) this.selectedTimeframe = null;
  }

  getMetricsForDimension(dimension: string): string[] {
    switch (dimension) {
      case 'Eficiencia en la Ejecución de Tareas':
        return [
          'Porcentaje de tareas completadas dentro del tiempo planificado',
          'Tiempo promedio empleado en la ejecución de cada tarea',
        ];
      case 'Eficiencia en el Uso de Recursos':
        return [
          'Porcentaje de herramientas usadas adecuadamente',
          'Cantidad de recursos utilizados en cada tarea',
        ];
      case 'Reducción de Tiempo de Resolución':
        return [
          'Tiempo promedio de resolución de incidencias',
          'Número de incidencias resueltas en menos de 30 minutos',
        ];
      case 'Optimización en el Uso de Suministros':
        return [
          'Porcentaje de desperdicio de suministros en cada tarea',
          'Cantidad de suministros consumidos por tipo de tarea',
        ];
      case 'Puntualidad en la Ejecución de Tareas':
        return [
          'Porcentaje de técnicos que cumplen con los horarios de llegada',
          'Porcentaje de tareas iniciadas puntualmente',
        ];
      case 'Tasa de Reportabilidad':
        return [
          'Porcentaje de actividades documentadas en tiempo real',
          'Precisión en los reportes documentados',
        ];
      case 'Satisfacción del Cliente':
        return [
          'Porcentaje de clientes satisfechos con el servicio en campo',
          'Tiempo promedio de resolución de quejas',
        ];
      case 'Tiempo de Inactividad':
        return [
          'Porcentaje de tiempo de inactividad de los técnicos',
          'Tiempo promedio de inactividad por técnico por día',
        ];
      default:
        return [];
    }
  }
}

// import { ChangeDetectorRef, Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatIconModule } from '@angular/material/icon';
// import { MatChipInputEvent } from '@angular/material/chips';
// import { MatChipListbox } from '@angular/material/chips';
// import { IBaseChipEventArgs } from 'igniteui-angular';
// import { IgxChipsModule, IgxIconModule } from 'igniteui-angular';

// @Component({
//   selector: 'app-okr-chips',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatChipsModule,
//     MatIconModule,
//     MatChipListbox,
//     IgxChipsModule,
//     IgxIconModule,
//   ],
//   templateUrl: './okr-chips.component.html',
//   styleUrls: ['./okr-chips.component.css'],
// })
// export class OkrChipsComponent {
//   dimensions = [
//     'Eficiencia en la Ejecución de Tareas',
//     'Eficiencia en el Uso de Recursos',
//     'Reducción de Tiempo de Resolución',
//     'Optimización en el Uso de Suministros',
//     'Puntualidad en la Ejecución de Tareas',
//     'Tasa de Reportabilidad',
//     'Satisfacción del Cliente',
//     'Tiempo de Inactividad',
//   ];

//   actions = ['Aumentar', 'Reducir', 'Mantener'];
//   metrics = [
//     'Porcentaje de tareas completadas dentro del tiempo planificado',
//     'Tiempo promedio empleado en la ejecución de cada tarea',
//   ];
//   goals = ['≥90%', '≥95%', '10%', '5%'];
//   timelines = ['1 mes', '3 meses', '6 meses', '1 año'];

//   selectedDimension: string | null = null;
//   selectedAction: string | null = null;
//   selectedMetric: string | null = null;
//   selectedGoal: string | null = null;
//   selectedTimeline: string | null = null;

//   assembledOKR: string | null = null;

//   selectDimension(dimension: string): void {
//     this.selectedDimension = dimension;
//     this.resetSelections('action');
//   }

//   selectAction(action: string): void {
//     this.selectedAction = action;
//     this.resetSelections('metric');
//   }

//   selectMetric(metric: string): void {
//     this.selectedMetric = metric;
//     this.resetSelections('goal');
//   }

//   selectGoal(goal: string): void {
//     this.selectedGoal = goal;
//     this.resetSelections('timeline');
//   }

//   selectTimeline(timeline: string): void {
//     this.selectedTimeline = timeline;
//     this.buildOKR();
//   }

//   buildOKR(): void {
//     this.assembledOKR = `${this.selectedAction} ${this.selectedDimension} usando ${this.selectedMetric} con una meta de ${this.selectedGoal} en un plazo de ${this.selectedTimeline}`;
//   }

//   resetSelections(level: string): void {
//     switch (level) {
//       case 'action':
//         this.selectedAction = null;
//         break;
//       case 'metric':
//         break;
//       case 'goal':
//         break;
//       case 'timeline':
//         this.selectedGoal = null;
//         this.selectedTimeline = null;
//         break;
//     }
//     this.assembledOKR = null;
//   }
// }
