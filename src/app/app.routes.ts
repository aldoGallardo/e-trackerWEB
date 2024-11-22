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
  // Login
  { path: 'login', component: LoginComponent },

  // Rutas protegidas
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Dashboard
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Panel Principal' },
      },

      // Empleados
      {
        path: 'employees',
        children: [
          {
            path: '',
            component: EmployeesComponent,
            data: { title: 'Empleados' },
          },
          {
            path: 'create',
            component: CreateEmployeeFormComponent,
            data: { title: 'Agregar Empleado' },
          },
        ],
      },

      // Sucursales
      {
        path: 'branches',
        component: BranchesComponent,
        data: { title: 'Sucursales', subtitle: 'Mostrar todas las sucursales' },
      },

      // Actividades
      {
        path: 'activities',
        component: ActivitiesComponent,
        data: { title: 'Actividades', subtitle: 'Seguimiento de actividades' },
      },

      // Asignaciones
      {
        path: 'assignments',
        component: AssignmentsComponent,
        data: { title: 'Asignaciones' },
      },

      // Suministros
      {
        path: 'supplies',
        component: SuppliesComponent,
        data: { title: 'Suministros', subtitle: 'Administrar suministros' },
      },

      // Tablero de Actividades
      {
        path: 'activity-board',
        component: ActivityBoardComponent,
        data: { title: 'Tablero de Actividades' },
      },

      // OKRs
      {
        path: 'okrs',
        component: OkrsComponent,
        data: { title: 'OKRs' },
      },
    ],
  },
];
