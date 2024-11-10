import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { BranchesComponent } from './components/branches/branches.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { SuppliesComponent } from './components/supplies/supplies.component';
import { CreateEmployeeFormComponent } from './components/employees/create-employee-form/create-employee-form.component';
import { ActivityBoardComponent } from './components/activity-board/activity-board.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/guards/auth.guard'; // Importa el guardia de autenticación
import { OkrsComponent } from './components/okrs/okrs.component'; // Importa el componente OKR

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Todos los empleados', title: 'Todos los empleados' },
  },
  {
    path: 'employees/create',
    component: CreateEmployeeFormComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Agregar Empleado', title: 'Agregar Empleado' },
  },
  {
    path: 'branches',
    component: BranchesComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Sucursales',
      title: 'Sucursales',
      subtitle: 'Mostrar todas las sucursales',
    },
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Actividades',
      title: 'Actividades',
      subtitle: 'Seguimiento de actividades',
    },
  },
  {
    path: 'assignments',
    component: AssignmentsComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Asignaciones',
      title: 'Asignaciones',
      subtitle: 'Asignaciones',
    },
  },
  {
    path: 'supplies',
    component: SuppliesComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Suministros',
      title: 'Suministros',
      subtitle: 'Administrar suministros',
    },
  },
  {
    path: 'activity-board',
    component: ActivityBoardComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Tablero de Actividades',
      title: 'Tablero de Actividades',
      subtitle: 'Mostrar todas las actividades en tablero',
    },
  },
  {
    path: 'okrs',
    component: OkrsComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: 'OKRs',
      title: 'OKRs',
      subtitle: 'Objetivos y Resultados Clave',
    },
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
