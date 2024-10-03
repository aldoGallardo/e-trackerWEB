import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // Importamos animaciones
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Importamos las rutas desde el archivo app.routes.ts

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Proporcionamos las rutas
    provideHttpClient(), // Proporcionamos el cliente HTTP para las peticiones
    provideAnimations(), // Proporcionamos soporte para animaciones
  ],
}).catch((err) => console.error(err));
