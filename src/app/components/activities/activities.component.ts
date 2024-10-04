import { Component, OnInit } from '@angular/core';
import { ApiActivitiesService } from '../../core/services/api-activities.service';
import { SearchbarComponent } from '../../shared/searchbar/searchbar.component';
import { CreateButtonComponent } from '../../shared/create-button/create-button.component';
import { FilterComponent } from '../../shared/filter/filter.component';
import { ListComponent } from '../../shared/list/list.component';
import {
  PaginatorComponent,
  PageEvent,
} from '../../shared/paginator/paginator.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [
    CommonModule,
    SearchbarComponent,
    CreateButtonComponent,
    FilterComponent,
    ListComponent,
    PaginatorComponent,
  ],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  activities: any[] = [];
  paginatedActivities: any[] = [];
  pageSize = 10;
  totalActivities: number = 0;
  lastActivityId: number | undefined = undefined;
  pageIndex = 0;

  constructor(private apiActivitiesService: ApiActivitiesService) {}

  ngOnInit(): void {
    this.apiActivitiesService
      .getTotalActivities()
      .subscribe((response: any) => {
        this.totalActivities = response.total; // Total de actividades desde el backend
        this.loadActivities();
      });
  }

  loadActivities(startAfterActivityId: number | undefined = undefined) {
    this.apiActivitiesService
      .getActivities(this.pageSize, startAfterActivityId)
      .subscribe(
        (data: any) => {
          if (data && data.length > 0) {
            this.activities = data;
            this.lastActivityId = data[data.length - 1].activityId;
            this.paginatedActivities = data;
          }
        },
        (error) => {
          console.error('Error al obtener las actividades', error);
        }
      );
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    const startAfter = this.pageIndex === 0 ? undefined : this.lastActivityId;

    this.loadActivities(startAfter);
  }

  filterActivities(query: string) {
    this.paginatedActivities = this.activities.filter((activity) =>
      activity.name.toLowerCase().includes(query.toLowerCase())
    );
    this.totalActivities = this.paginatedActivities.length;
  }
}
