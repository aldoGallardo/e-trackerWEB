import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private readonly baseUrl = 'http://localhost:3000/okrs';

  constructor(private http: HttpClient) {}

  getAllOkrs(): Observable<Okr[]> {
    return this.http.get<Okr[]>(`${this.baseUrl}`);
  }

  getOkrById(id: string): Observable<Okr> {
    return this.http.get<Okr>(`${this.baseUrl}/${id}`);
  }

  getOkrWithKpis(id: string): Observable<Okr> {
    return this.http.get<Okr>(`${this.baseUrl}/${id}/kpis`);
  }

  createOkr(okr: Partial<Okr>): Observable<Okr> {
    return this.http.post<Okr>(`${this.baseUrl}`, okr);
  }

  updateOkr(id: string, okr: Partial<Okr>): Observable<Okr> {
    return this.http.patch<Okr>(`${this.baseUrl}/${id}`, okr);
  }

  deleteOkr(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
