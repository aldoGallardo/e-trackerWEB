import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { OkrCardsComponent } from './okr-cards/okr-cards.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent, OkrCardsComponent, VerticalBarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {}
