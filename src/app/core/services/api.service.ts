import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlApi = 'http://localhost:3000/users'; // Ruta para obtener todos los empleados

  constructor(private http: HttpClient) {}

  // Método para obtener todos los empleados
  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.urlApi);
  }

  // Método para obtener un empleado por ID
  public getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.urlApi}/${id}`);
  }
}
