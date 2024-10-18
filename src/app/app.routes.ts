import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { BranchesComponent } from './components/branches/branches.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { SuppliesComponent } from './components/supplies/supplies.component';
import { CreateEmployeeFormComponent } from './components/employees/create-employee-form/create-employee-form.component';
import { ActivityBoardComponent } from './components/activity-board/activity-board.component'; // Importar el componente del tablero de actividades

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Dashboard',
      title: 'Dashboard',
    },
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    data: {
      breadcrumb: 'Todos los empleados',
      title: 'Todos los empleados',
    },
  },
  {
    path: 'employees/create', // Ruta específica para crear un nuevo empleado
    component: CreateEmployeeFormComponent,
    data: {
      breadcrumb: 'Agregar Empleado',
      title: 'Agregar Empleado',
    },
  },
  {
    path: 'branches',
    component: BranchesComponent,
    data: {
      breadcrumb: 'Sucursales',
      title: 'Sucursales',
      subtitle: 'Mostrar todas las sucursales',
    },
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
    data: {
      breadcrumb: 'Actividades',
      title: 'Actividades',
      subtitle: 'Seguimiento de actividades',
    },
  },
  {
    path: 'assignments',
    component: AssignmentsComponent,
    data: {
      breadcrumb: 'Asignaciones',
      title: 'Asignaciones',
      subtitle: 'Asignaciones',
    },
  },
  {
    path: 'supplies',
    component: SuppliesComponent,
    data: {
      breadcrumb: 'Suministros',
      title: 'Suministros',
      subtitle: 'Administrar suministros',
    },
  },
  {
    path: 'activity-board', // Nueva ruta para el tablero de actividades
    component: ActivityBoardComponent,
    data: {
      breadcrumb: 'Tablero de Actividades',
      title: 'Tablero de Actividades',
      subtitle: 'Mostrar todas las actividades en tablero',
    },
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirigir al dashboard por defecto
  { path: '**', redirectTo: 'dashboard' }, // Redirigir cualquier ruta no válida al dashboard
];
