// import { Injectable } from '@angular/core';
// import {
//   Auth,
//   signInWithEmailAndPassword,
//   signOut,
//   user,
// } from '@angular/fire/auth';
// import { Firestore, doc, getDoc } from '@angular/fire/firestore';
// import { Observable, from, of } from 'rxjs';
// import { switchMap, map } from 'rxjs/operators';

// interface UserData {
//   userType: string;
// }

// interface UserTypeData {
//   rol: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private auth: Auth, private firestore: Firestore) {}

//   // Método para iniciar sesión
//   login(email: string, password: string): Observable<any> {
//     return from(signInWithEmailAndPassword(this.auth, email, password));
//   }

//   // Método para cerrar sesión
//   logout(): Observable<void> {
//     return from(signOut(this.auth));
//   }

//   // Método para verificar si el usuario es administrador
//   isAdmin(): Observable<boolean> {
//     return user(this.auth).pipe(
//       switchMap((user) => {
//         if (!user) {
//           console.log('Usuario no autenticado');
//           return of(false);
//         }

//         // Obtener el documento del usuario
//         console.log('Usuario autenticado:', user.uid);
//         const userDocRef = doc(this.firestore, `users/${user.uid}`);
//         return from(getDoc(userDocRef)).pipe(
//           switchMap((userDoc) => {
//             if (!userDoc.exists()) {
//               console.log('No se encontró el documento de usuario');
//               return of(false);
//             }

//             const userData = userDoc.data() as UserData;
//             console.log('Datos del usuario:', userData);

//             const userTypeDocRef = doc(
//               this.firestore,
//               `userTypes/${userData.userType}`
//             );

//             return from(getDoc(userTypeDocRef)).pipe(
//               map((typeDoc) => {
//                 if (!typeDoc.exists()) {
//                   console.log('No se encontró el tipo de usuario');
//                   return false;
//                 }

//                 const typeData = typeDoc.data() as UserTypeData;
//                 console.log('Datos del tipo de usuario:', typeData);
//                 return typeData.rol === 'admin'; // Verifica si el rol es 'admin'
//               })
//             );
//           })
//         );
//       })
//     );
//   }
// }

import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  async login(email: string, password: string): Promise<string> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      sessionStorage.setItem('uid', uid);
      console.log('UID guardado en sessionStorage:', uid);
      return uid;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw this.getErrorMessage(error);
      }
      throw 'Ocurrió un error inesperado.';
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      sessionStorage.removeItem('uid');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  getUID(): string | null {
    return sessionStorage.getItem('uid');
  }

  private getErrorMessage(error: FirebaseError): string {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'El correo ingresado no es válido.';
      case 'auth/user-disabled':
        return 'Esta cuenta ha sido deshabilitada.';
      case 'auth/user-not-found':
        return 'No existe un usuario con este correo.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      default:
        return 'Ocurrió un error en la autenticación.';
    }
  }
}
