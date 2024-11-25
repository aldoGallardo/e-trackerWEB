import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_ASSIGNMENTS } from 'src/app/env';

@Injectable({
  providedIn: 'root',
})
export class ApiAssignmentsService {
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

    return this.http.get<any>(URL_ASSIGNMENTS, { params });
  }

  getTotalAssignments(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${URL_ASSIGNMENTS}/total`);
  }

  getAssignmentsForToday(today: Date): Observable<any[]> {
    const dateString = today.toISOString().split('T')[0];
    return this.http.get<any[]>(
      `${URL_ASSIGNMENTS}?assignmentDate=${dateString}`
    );
  }

  public getAssignmentById(id: string): Observable<any> {
    return this.http.get<any>(`${URL_ASSIGNMENTS}/${id}`);
  }

  addAssignment(assignment: any): Observable<any> {
    return this.http
      .post<any>(URL_ASSIGNMENTS, assignment)
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
      .patch<any>(`${URL_ASSIGNMENTS}/${id}/update`, assignment)
      .pipe(catchError(this.handleError));
  }

  searchAssignment(term: string): Observable<any> {
    let params = new HttpParams().set('term', term);
    return this.http.get<any>(`${URL_ASSIGNMENTS}/search`, { params });
  }

  private handleError(error: any) {
    console.error('Request error:', error);
    return throwError(() => new Error('Error occurred, please try again.'));
  }
}
