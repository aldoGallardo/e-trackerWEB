import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { NgClass, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, NgClass, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  items: any[] = [];

  constructor() {
    this.initializeMenu();
  }

  initializeMenu() {
    this.items = [
      {
        label: 'File',
        items: [
          { label: 'New', icon: 'pi pi-fw pi-plus' },
          { label: 'Open', icon: 'pi pi-fw pi-external-link' },
          { label: 'Quit', icon: 'pi pi-fw pi-times' },
        ],
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo', icon: 'pi pi-fw pi-undo' },
          { label: 'Redo', icon: 'pi pi-fw pi-redo' },
        ],
      },
      {
        label: 'View',
        items: [
          { label: 'Zoom In', icon: 'pi pi-fw pi-search-plus' },
          { label: 'Zoom Out', icon: 'pi pi-fw pi-search-minus' },
        ],
      },
      {
        label: 'Help',
        items: [
          { label: 'Contents', icon: 'pi pi-fw pi-info' },
          { label: 'Search', icon: 'pi pi-fw pi-search' },
        ],
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard',
      },
      {
        label: 'Empleados',
        icon: 'pi pi-fw pi-users',
        routerLink: '/employees',
      },
      {
        label: 'Sucursales',
        icon: 'pi pi-fw pi-building',
        routerLink: '/branches',
      },
      {
        label: 'Actividades',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/activities',
      },
      {
        label: 'Suministros',
        icon: 'pi pi-fw pi-box',
        routerLink: '/supplies',
      },
    ];
  }
}
