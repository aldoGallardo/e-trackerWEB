import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component'; // Corrige la ruta si es necesario
import { Router, NavigationEnd } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }

  title = 'e-trackerWEB';

  toggleTheme() {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark'); // Alterna entre temas claro y oscuro
  }

  isDashboard = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDashboard = this.router.url === '/dashboard';
      }
    });
  }
}
