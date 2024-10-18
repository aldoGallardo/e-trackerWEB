import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Activity } from '@core/models/activity.model';
import { ApiActivityTypesService } from './api-activityTypes.service';
import { ApiBranchesService } from './api-branches.service';

@Injectable({
  providedIn: 'root',
})
export class ApiActivitiesService {
  private urlApi = 'http://localhost:3000/activities';
  private usersApi = 'http://localhost:3000/users'; // Endpoint para obtener usuarios
  private userCache = new Map<string, string>(); // Cache para los nombres de usuario

  constructor(
    private http: HttpClient,
    private apiActivityTypesService: ApiActivityTypesService,
    private apiBranchesService: ApiBranchesService
  ) {}

  // Obtener actividades con paginación y mapeo de tipos de actividad
  getActivities(
    pageSize: number,
    startAfterActivityNumber?: number
  ): Observable<any[]> {
    let params = new HttpParams().set('pageSize', pageSize.toString());

    if (startAfterActivityNumber) {
      params = params.set(
        'startAfterActivityNumber',
        startAfterActivityNumber.toString()
      );
    }

    return this.http.get<any[]>(this.urlApi, { params }).pipe(
      switchMap((activities) =>
        this.apiActivityTypesService.getActivityTypes().pipe(
          map((activityTypes) => {
            const typeMap = new Map(
              activityTypes.map((type) => [type.id, type.name])
            );

            return activities.map((activity) => {
              if (activity.startedAt?._seconds) {
                activity.startedAt = new Date(
                  activity.startedAt._seconds * 1000
                );
              }
              if (activity.assignmentDate?._seconds) {
                activity.assignmentDate = new Date(
                  activity.assignmentDate._seconds * 1000
                );
              }

              activity.activityType =
                typeMap.get(activity.activityType) || 'Desconocido';
              return activity;
            });
          })
        )
      ),
      catchError(this.handleError)
    );
  }

  // Obtener todas las actividades sin paginación
  getAllActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlApi}`).pipe(
      map((activities) => {
        console.log('Actividades desde API:', activities); // Debug para revisar la respuesta completa
        return activities;
      }),
      catchError(this.handleError)
    );
  }

  // Si necesitas paginar (solo si el backend lo soporta)
  getActivitiesPaginated(
    pageSize: number,
    pageIndex: number
  ): Observable<any[]> {
    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageIndex', pageIndex.toString());

    return this.http.get<any[]>(this.urlApi, { params }).pipe(
      map((activities) => activities || []),
      catchError(this.handleError)
    );
  }

  getTotalActivities(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/total`);
  }

  getActivityById(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/${id}`);
  }

  addActivity(activity: any): Observable<any> {
    return this.http
      .post<any>(this.urlApi, activity)
      .pipe(catchError(this.handleError));
  }

  updateActivity(activity: Activity): Observable<any> {
    const { id, ...activityData } = activity;
    return this.http.patch(
      `http://localhost:3000/activities/${id}/update`,
      activityData
    );
  }

  searchActivities(term: string): Observable<any> {
    let params = new HttpParams().set('term', term);
    return this.http.get<any>(`${this.urlApi}/search`, { params });
  }

  getUserNames(userIds: string[]): Observable<Map<string, string>> {
    const uncachedIds = userIds.filter((id) => !this.userCache.has(id));

    if (uncachedIds.length === 0) {
      return of(this.userCache);
    }

    return this.http
      .get<any[]>(this.usersApi, { params: { ids: uncachedIds.join(',') } })
      .pipe(
        tap((users) => {
          users.forEach((user) =>
            this.userCache.set(user.id, `${user.firstName} ${user.lastName}`)
          );
        }),
        map(() => this.userCache),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Request error:', error);
    return throwError(() => new Error('Error occurred, please try again.'));
  }
}
