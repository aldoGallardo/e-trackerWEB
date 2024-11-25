import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActivityType } from '../models/activityType.model';
import { URL_ACTIVITY_TYPES } from 'src/app/env';

@Injectable({
  providedIn: 'root',
})
export class ApiActivityTypesService {
  constructor(private http: HttpClient) {}

  getActivityTypes(): Observable<ActivityType[]> {
    return this.http
      .get<ActivityType[]>(URL_ACTIVITY_TYPES)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Request error:', error);
    return throwError(() => new Error('Error occurred, please try again.'));
  }

  getActivityTypeById(id: string): Observable<ActivityType> {
    return this.http
      .get<ActivityType>(`${URL_ACTIVITY_TYPES}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
