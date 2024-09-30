import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component'; // Corrige la ruta si es necesario

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'e-trackerWEB';

  toggleTheme() {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark'); // Alterna entre temas claro y oscuro
  }
}
