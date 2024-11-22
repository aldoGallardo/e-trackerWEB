import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-okr-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './okr-table.component.html',
  styleUrls: ['./okr-table.component.css'],
})
export class OkrTableComponent {
  getProgressColor(progress: number): string {
    if (progress > 80) {
      return '#28a745'; // Verde
    } else if (progress > 50) {
      return '#ffc107'; // Amarillo
    } else if (progress > 25) {
      return '#fd7e14'; // Naranja
    } else {
      return '#dc3545'; // Rojo
    }
  }

  getRemainingColor(progress: number): string {
    const color = this.getProgressColor(progress);
    return this.lightenColor(color, 60); // Ajustar claridad
  }

  lightenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  // Lista de datos con progreso
  okrList = [
    {
      date: '11/24',
      objective: 'Mejorar la eficiencia operativa en campo',
      keyResult: 'Aumentar la eficiencia en la ejecución de tareas',
      goal: '90%',
      progress: 90, // Representa el porcentaje completado
    },
    {
      date: '11/24',
      objective: 'Optimizar la logística de transporte',
      keyResult: 'Reducir tiempos de espera',
      goal: '70%',
      progress: 70,
    },
    {
      date: '11/24',
      objective: 'Incrementar la calidad del servicio',
      keyResult: 'Mejorar la satisfacción del cliente',
      goal: '40%',
      progress: 40,
    },
    {
      date: '11/24',
      objective: 'Aumentar la capacidad de respuesta',
      keyResult: 'Disminuir tiempos de atención',
      goal: '20%',
      progress: 20,
    },
    {
      date: '11/24',
      objective: 'Reducir los costos operativos',
      keyResult: 'Implementar sistemas automatizados',
      goal: '55%',
      progress: 55,
    },
    {
      date: '11/24',
      objective: 'Mejorar la eficiencia operativa en campo',
      keyResult: 'Aumentar la eficiencia en la ejecución de tareas',
      goal: '90%',
      progress: 90, // Representa el porcentaje completado
    },
    {
      date: '11/24',
      objective: 'Optimizar la logística de transporte',
      keyResult: 'Reducir tiempos de espera',
      goal: '70%',
      progress: 70,
    },
    {
      date: '11/24',
      objective: 'Incrementar la calidad del servicio',
      keyResult: 'Mejorar la satisfacción del cliente',
      goal: '40%',
      progress: 40,
    },
    {
      date: '11/24',
      objective: 'Aumentar la capacidad de respuesta',
      keyResult: 'Disminuir tiempos de atención',
      goal: '20%',
      progress: 20,
    },
    {
      date: '11/24',
      objective: 'Reducir los costos operativos',
      keyResult: 'Implementar sistemas automatizados',
      goal: '55%',
      progress: 55,
    },
    {
      date: '11/24',
      objective: 'Mejorar la eficiencia operativa en campo',
      keyResult: 'Aumentar la eficiencia en la ejecución de tareas',
      goal: '90%',
      progress: 90, // Representa el porcentaje completado
    },
    {
      date: '11/24',
      objective: 'Optimizar la logística de transporte',
      keyResult: 'Reducir tiempos de espera',
      goal: '70%',
      progress: 70,
    },
    {
      date: '11/24',
      objective: 'Incrementar la calidad del servicio',
      keyResult: 'Mejorar la satisfacción del cliente',
      goal: '40%',
      progress: 40,
    },
    {
      date: '11/24',
      objective: 'Aumentar la capacidad de respuesta',
      keyResult: 'Disminuir tiempos de atención',
      goal: '20%',
      progress: 20,
    },
    {
      date: '11/24',
      objective: 'Optimizar la logística de transporte',
      keyResult: 'Reducir tiempos de espera',
      goal: '70%',
      progress: 70,
    },
    {
      date: '11/24',
      objective: 'Incrementar la calidad del servicio',
      keyResult: 'Mejorar la satisfacción del cliente',
      goal: '40%',
      progress: 40,
    },
    {
      date: '11/24',
      objective: 'Aumentar la capacidad de respuesta',
      keyResult: 'Disminuir tiempos de atención',
      goal: '20%',
      progress: 20,
    },
  ];
}
