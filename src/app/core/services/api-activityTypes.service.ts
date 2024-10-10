import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActivityType } from '../models/activityType.model';

@Injectable({
  providedIn: 'root',
})
export class ApiActivityTypesService {
  private urlApi = 'http://localhost:3000/activity-types';

  constructor(private http: HttpClient) {}

  getActivityTypes(): Observable<ActivityType[]> {
    return this.http
      .get<ActivityType[]>(this.urlApi)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Request error:', error);
    return throwError(() => new Error('Error occurred, please try again.'));
  }
}
