// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Employee } from '../models/employee.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   private urlApi = 'http://localhost:3000/users'; // Ruta para obtener todos los empleados

//   constructor(private http: HttpClient) {}

//   // Método para obtener todos los empleados
//   getEmployees(pageSize: number, startAfterUserNumber?: number) {
//     let params: any = { pageSize };

//     if (startAfterUserNumber) {
//       params.startAfterUserNumber = startAfterUserNumber;
//     }

//     return this.http.get<any>('/users', { params });
//   }

//   // Método para obtener un empleado por ID
//   public getEmployeeById(id: string): Observable<Employee> {
//     return this.http.get<Employee>(`${this.urlApi}/${id}`);
//   }
// }
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlApi = 'http://localhost:3000/users'; // Ruta correcta a la API

  constructor(private http: HttpClient) {}

  // Método para obtener todos los empleados con paginación
  getEmployees(
    pageSize: number,
    startAfterUserNumber?: number
  ): Observable<any> {
    let params = new HttpParams().set('pageSize', pageSize.toString());

    if (startAfterUserNumber) {
      params = params.set(
        'startAfterUserNumber',
        startAfterUserNumber.toString()
      );
    }

    return this.http.get<any>(this.urlApi, { params }); // Llamada al endpoint correcto
  }

  // Método para obtener un empleado por ID
  public getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.urlApi}/${id}`);
  }
}
