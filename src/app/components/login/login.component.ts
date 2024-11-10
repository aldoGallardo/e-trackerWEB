// import { Component } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   loginForm: FormGroup;

//   constructor(
//     private authService: AuthService,
//     private fb: FormBuilder,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

//   login(): void {
//     if (this.loginForm.valid) {
//       const { email, password } = this.loginForm.value;
//       this.authService.login(email, password).subscribe({
//         next: () => {
//           // Intenta navegar al dashboard solo después de verificar si es admin
//           this.authService.isAdmin().subscribe((isAdmin) => {
//             if (isAdmin) {
//               this.router.navigate(['/dashboard']);
//             } else {
//               alert(
//                 'Acceso denegado: Solo los administradores pueden acceder.'
//               );
//               this.router.navigate(['/login']);
//             }
//           });
//         },
//         error: (error) => console.error(error),
//       });
//     }
//   }
// }

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email = '';
  password = '';
  emailError = signal<string | null>(null);
  passwordError = signal<string | null>(null);
  authError = signal<string | null>(null);
  private authService = inject(AuthService);
  private router = inject(Router);

  async login() {
    this.emailError.set(null);
    this.passwordError.set(null);
    this.authError.set(null);

    if (!this.email.trim()) {
      this.emailError.set('El correo electrónico es obligatorio.');
    }
    if (!this.password) {
      this.passwordError.set('La contraseña es obligatoria.');
    }
    if (this.emailError() || this.passwordError()) {
      return;
    }

    try {
      const uid = await this.authService.login(this.email, this.password);
      console.log('Login exitoso, UID:', uid);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.authError.set(error);
    }
  }
}
