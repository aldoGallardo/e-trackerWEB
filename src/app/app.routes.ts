import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { BranchesComponent } from './components/branches/branches.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { SuppliesComponent } from './components/supplies/supplies.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'branches', component: BranchesComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'supplies', component: SuppliesComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
