import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '@core/models/employee.model';
import { Branch } from '@core/models/branch.model';

@Injectable({
  providedIn: 'root',
})
export class ApiEmployeesService {
  private urlApi = 'http://localhost:3000/users';
  private urlApi2 = 'http://localhost:3000/users/without-daily-assistance';
  private branchApi = 'http://localhost:3000/branchOffices';

  constructor(private http: HttpClient) {}

  getEmployees(
    pageSize: number,
    startAfterUserNumber?: number
  ): Observable<any> {
    console.log(startAfterUserNumber);
    let params = new HttpParams().set('pageSize', pageSize.toString());

    if (startAfterUserNumber) {
      params = params.set(
        'startAfterUserNumber',
        startAfterUserNumber.toString()
      );
    }

    return this.http.get<any>(this.urlApi2, { params });
  }

  getTotalUsers(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.urlApi}/total`);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.urlApi}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this.urlApi, employee)
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.urlApi}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getBranches(): Observable<Branch[]> {
    return this.http
      .get<Branch[]>(this.branchApi)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Request error:', error);
    return throwError(() => new Error('Error occurred, please try again.'));
  }
}
