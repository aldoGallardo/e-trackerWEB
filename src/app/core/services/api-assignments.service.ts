import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Branch } from '@core/models/branch.model';
import { ActivityType } from '@core/models/activityType.model';
import { Activity } from '@core/models/activity.model';
import { Employee } from '@core/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class ApiAssignmentsService {
  private urlApi = 'http://localhost:3000/assignments';
  private branchApi = 'http://localhost:3000/branchOffices';
  private activityTypeApi = 'http://localhost:3000/activity-types';
  private employeeApi = 'http://localhost:3000/users/without-daily-assistance';
  private activityApi = 'http://localhost:3000/activities';

  constructor(private http: HttpClient) {}

  getAssignments(
    pageSize: number,
    startAfterAssignmentNumber?: number
  ): Observable<any> {
    console.log(startAfterAssignmentNumber);
    let params = new HttpParams().set('pageSize', pageSize.toString());

    if (startAfterAssignmentNumber) {
      params = params.set(
        'startAfterAssignmentNumber',
        startAfterAssignmentNumber.toString()
      );
    }

    return this.http.get<any>(this.urlApi, { params });
  }

  getTotalAssignments(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.urlApi}/total`);
  }

  getAssignmentsForToday(today: Date): Observable<any[]> {
    const dateString = today.toISOString().split('T')[0];
    return this.http.get<any[]>(`${this.urlApi}?assignmentDate=${dateString}`);
  }

  public getAssignmentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/${id}`);
  }

  addAssignment(assignment: any): Observable<any> {
    return this.http
      .post<any>(this.urlApi, assignment)
      .pipe(catchError(this.handleError));
  }

  updateAssignment(
    assignment: {
      orderNumber: string;
      assignTo: string;
    },
    id: string
  ): Observable<any> {
    console.log(assignment);
    return this.http
      .patch<any>(`${this.urlApi}/${id}/update`, assignment)
      .pipe(catchError(this.handleError));
  }

  searchAssignment(term: string): Observable<any> {
    let params = new HttpParams().set('term', term);
    return this.http.get<any>(`${this.urlApi}/search`, { params });
  }

  getBranches(): Observable<Branch[]> {
    return this.http
      .get<Branch[]>(this.branchApi)
      .pipe(catchError(this.handleError));
  }

  getActivityTypes(): Observable<ActivityType[]> {
    return this.http
      .get<ActivityType[]>(this.activityTypeApi)
      .pipe(catchError(this.handleError));
  }

  getActivities(): Observable<Activity[]> {
    return this.http
      .get<Activity[]>(this.activityApi)
      .pipe(catchError(this.handleError));
  }

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.employeeApi)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Request error:', error);
    return throwError(() => new Error('Error occurred, please try again.'));
  }
}
