import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ApiActivitiesService } from 'src/app/core/services/api-activities.service';
import { ApiAssignmentsService } from 'src/app/core/services/api-assignments.service';
import { ApiActivityTypesService } from 'src/app/core/services/api-activityTypes.service';
import { ApiBranchesService } from 'src/app/core/services/api-branches.service';
import { ApiEmployeesService } from 'src/app/core/services/api-employees.service';

@Component({
  selector: 'app-activity-board',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
  ],
  templateUrl: './activity-board.component.html',
  styleUrls: ['./activity-board.component.css'],
})
export class ActivityBoardComponent implements OnInit {
  activities: any[] = [];
  assignments: any[] = [];
  pendingActivities: any[] = [];
  inProgressActivities: any[] = [];
  completedActivities: any[] = [];
  branches: any[] = [];
  usersMap: Map<string, { name: string; lastName: string }> = new Map();
  selectedBranch: string = 'all';
  showAllPending = false;
  showAllInProgress = false;
  showAllCompleted = false;

  constructor(
    private apiActivitiesService: ApiActivitiesService,
    private apiAssignmentsService: ApiAssignmentsService,
    private apiActivityTypesService: ApiActivityTypesService,
    private apiBranchesService: ApiBranchesService,
    private apiEmployeesService: ApiEmployeesService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadBranches();
    this.loadDataForToday();
  }

  loadUsers(): void {
    this.apiEmployeesService.getAllEmployees().subscribe((users) => {
      console.log('Usuarios cargados:', users); // Verifica la carga en consola
      this.usersMap = new Map(
        users.map((user) => [
          user.id,
          { name: user.name || 'N/A', lastName: user.lastName || 'N/A' },
        ])
      );
      this.loadBranches(); // Cargar sucursales después de cargar usuarios
      this.loadDataForToday(); // Finalmente, cargar las actividades y asignaciones
    });
  }

  loadBranches(): void {
    this.apiBranchesService.getBranches().subscribe((branches: any[]) => {
      this.branches = branches;
    });
  }

  loadDataForToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    forkJoin({
      activities: this.apiActivitiesService.getAllActivities(),
      assignments: this.apiAssignmentsService.getAssignmentsForToday(today),
      branches: this.apiBranchesService.getBranches(),
      activityTypes: this.apiActivityTypesService.getActivityTypes(),
    }).subscribe(({ activities, assignments, branches, activityTypes }) => {
      const branchMap = new Map(branches.map((b: any) => [b.id, b.name]));
      const activityTypeMap = new Map(
        activityTypes.map((t: any) => [t.id, t.name])
      );

      const allData = [
        ...activities.map((item) =>
          this.mapDataToDisplay(item, branchMap, activityTypeMap)
        ),
        ...assignments.map((item) =>
          this.mapDataToDisplay(item, branchMap, activityTypeMap)
        ),
      ];

      this.pendingActivities = allData.filter((a) => a.status === 'pending');
      this.inProgressActivities = allData.filter(
        (a) => a.status === 'inProgress'
      );
      this.completedActivities = allData.filter(
        (a) => a.status === 'completed'
      );
    });
  }

  private mapDataToDisplay(
    activityOrAssignment: any,
    branchMap: Map<string, string>,
    activityTypeMap: Map<string, string>
  ) {
    return {
      orderNumber:
        activityOrAssignment.orderNumber ||
        activityOrAssignment.assignmentNumber ||
        'N/A',
      address: activityOrAssignment.address || 'Sin dirección',
      activityType:
        activityTypeMap.get(activityOrAssignment.activityType) || 'Sin tipo',
      assignTo: this.getUserName(activityOrAssignment.assignTo),
      startedAt: this.convertTimestamp(
        activityOrAssignment.startedAt || activityOrAssignment.assignmentDate
      ),
      completedAt:
        this.convertTimestamp(activityOrAssignment.completedAt) || '---',
      status: activityOrAssignment.status || 'pending',
    };
  }

  private getUserName(userId: string): string {
    const user = this.usersMap.get(userId);
    if (!user) return 'Sin asignar';
    return `${user.name} ${user.lastName}`.trim();
  }

  toggleShowAll(type: string): void {
    switch (type) {
      case 'pending':
        this.showAllPending = !this.showAllPending;
        break;
      case 'inProgress':
        this.showAllInProgress = !this.showAllInProgress;
        break;
      case 'completed':
        this.showAllCompleted = !this.showAllCompleted;
        break;
    }
  }

  private convertTimestamp(timestamp: any): Date | null {
    if (!timestamp) return null;
    if (timestamp._seconds) return new Date(timestamp._seconds * 1000);
    if (typeof timestamp === 'string' || typeof timestamp === 'number') {
      return new Date(timestamp);
    }
    return null;
  }
}
