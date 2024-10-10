import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { BranchesComponent } from './components/branches/branches.component';
import { ActivitiesComponent } from './components/activities/activities.component';
// import { SuppliesComponent } from './components/supplies/supplies.component';
import { CreateEmployeeFormComponent } from './components/employees/create-employee-form/create-employee-form.component';

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
    path: 'employees/create',
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
  // {
  //   path: 'supplies',
  //   component: SuppliesComponent,
  //   data: {
  //     breadcrumb: 'Suministros',
  //     title: 'Suministros',
  //     subtitle: 'Administrar suministros',
  //   },
  // },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
];
