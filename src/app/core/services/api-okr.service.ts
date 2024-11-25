import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_OKRS } from 'src/app/env';

interface Okr {
  id: string;
  objective: string;
  keyResults: string[];
  kpis?: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiOkrService {
  constructor(private http: HttpClient) {}

  getAllOkrs(): Observable<Okr[]> {
    return this.http.get<Okr[]>(URL_OKRS);
  }

  getOkrById(id: string): Observable<Okr> {
    return this.http.get<Okr>(`${URL_OKRS}/${id}`);
  }

  getOkrWithKpis(id: string): Observable<Okr> {
    return this.http.get<Okr>(`${URL_OKRS}/${id}/kpis`);
  }

  createOkr(okr: Partial<Okr>): Observable<Okr> {
    return this.http.post<Okr>(`${URL_OKRS}`, okr);
  }

  updateOkr(id: string, okr: Partial<Okr>): Observable<Okr> {
    return this.http.patch<Okr>(`${URL_OKRS}/${id}`, okr);
  }

  deleteOkr(id: string): Observable<void> {
    return this.http.delete<void>(`${URL_OKRS}/${id}`);
  }
}
