import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KpiService {
  private apiUrl = 'http://localhost:3000/kpis'; // Cambia esta URL según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener todos los KPIs
  getAllKpis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener un KPI por ID
  getKpiById(kpiId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${kpiId}`);
  }

  // Crear un KPI
  createKpi(kpiData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, kpiData);
  }

  // Actualizar un KPI
  updateKpi(kpiId: string, kpiData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${kpiId}`, kpiData);
  }

  // Calcular KPI
  calculateKpi(kpiId: string, variables: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate/${kpiId}`, variables);
  }

  // Eliminar un KPI
  deleteKpi(kpiId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${kpiId}`);
  }
}
