import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() dashboardLayout = false;

  title: string = '';
  subtitle: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.updateNavbar();
    });
  }

  updateNavbar() {
    const currentRoute = this.router.url;

    if (currentRoute.includes('/dashboard')) {
      this.title = 'Hola Robert 👋';
      this.subtitle = 'Buenos días';
    } else if (currentRoute.includes('/employees')) {
      this.title = 'Todos los empleados';
      this.subtitle = 'Mostrar información de empleados';
    } else if (currentRoute.includes('/branches')) {
      this.title = 'Sucursales';
      this.subtitle = 'Mostrar todas las sucursales';
    } else if (currentRoute.includes('/activities')) {
      this.title = 'Actividades';
      this.subtitle = 'Mostrar todas las actividades';
    } else if (currentRoute.includes('/supplies')) {
      this.title = 'Suministros';
      this.subtitle = 'Mostrar todos los suministros';
    }
  }
}
