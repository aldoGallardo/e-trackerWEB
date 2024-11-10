import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Kpi {
  id: string;
  name: string;
  target: number;
  progress: number;
  description: string;
  color: string; // Clase de color para cada KPI
}

@Component({
  selector: 'app-okr-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './okr-cards.component.html',
  styleUrls: ['./okr-cards.component.css'],
})
export class OkrCardsComponent implements OnInit {
  kpis: Kpi[] = [
    {
      id: '1',
      name: 'Reportabilidad',
      target: 80,
      progress: 80,
      description: 'Mide el reporte de actividades',
      color: 'bg-gradient-to-r from-red-400 to-red-200',
    },
    {
      id: '2',
      name: 'Uso Eficiente de Suministros',
      target: 95,
      progress: 95,
      description: 'Optimización en suministros',
      color: 'bg-gradient-to-r from-yellow-400 to-yellow-200',
    },
    {
      id: '3',
      name: 'Eficiencia en Uso de Tiempo',
      target: 70,
      progress: 70,
      description: 'Gestión de tiempo',
      color: 'bg-gradient-to-r from-green-400 to-green-200',
    },
    {
      id: '4',
      name: 'Puntualidad',
      target: 85,
      progress: 85,
      description: 'Cumplimiento de horarios',
      color: 'bg-gradient-to-r from-purple-400 to-purple-200',
    },
    {
      id: '5',
      name: 'Calidad de Servicio',
      target: 90,
      progress: 88,
      description: 'Mide la calidad del servicio',
      color: 'bg-gradient-to-r from-blue-400 to-blue-200',
    },
    {
      id: '6',
      name: 'Tiempo de Respuesta',
      target: 60,
      progress: 65,
      description: 'Rapidez en atender solicitudes',
      color: 'bg-gradient-to-r from-indigo-400 to-indigo-200',
    },
    {
      id: '7',
      name: 'Reducción de Costos',
      target: 50,
      progress: 55,
      description: 'Optimización de costos',
      color: 'bg-gradient-to-r from-pink-400 to-pink-200',
    },
    {
      id: '8',
      name: 'Satisfacción del Cliente',
      target: 92,
      progress: 90,
      description: 'Nivel de satisfacción del cliente',
      color: 'bg-gradient-to-r from-teal-400 to-teal-200',
    },
  ];

  activeIndex: number = 0;

  ngOnInit(): void {}

  nextGroup(): void {
    const maxIndex = Math.ceil(this.kpis.length / 4) - 1;
    this.activeIndex = (this.activeIndex + 1) % (maxIndex + 1);
  }

  previousGroup(): void {
    const maxIndex = Math.ceil(this.kpis.length / 4) - 1;
    this.activeIndex = (this.activeIndex - 1 + (maxIndex + 1)) % (maxIndex + 1);
  }
}
