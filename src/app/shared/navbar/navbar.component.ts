import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'Bienvenido a e-Tracker';
  showSubtitle = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  logout(): void {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada correctamente.');
      this.router.navigate(['/login']); // Redirige al login
    });
  }

  private updateTitle(): void {
    // Aquí podrías agregar lógica para actualizar título y subtítulo si necesitas dinámicos
    // Por defecto, mantiene los valores iniciales.
  }
}
