import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListComponent } from './activity-list/activity-list.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, ActivityListComponent],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent {}
