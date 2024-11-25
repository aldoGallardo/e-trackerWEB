import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_KPIS } from 'src/app/env';

@Injectable({
  providedIn: 'root',
})
export class KpiService {
  constructor(private http: HttpClient) {}

  // Obtener todos los KPIs
  getAllKpis(): Observable<any[]> {
    return this.http.get<any[]>(`${URL_KPIS}`);
  }

  // Obtener un KPI por ID
  getKpiById(kpiId: string): Observable<any> {
    return this.http.get(`${URL_KPIS}/${kpiId}`);
  }

  // Crear un KPI
  createKpi(kpiData: any): Observable<any> {
    return this.http.post(`${URL_KPIS}`, kpiData);
  }

  // Actualizar un KPI
  updateKpi(kpiId: string, kpiData: any): Observable<any> {
    return this.http.put(`${URL_KPIS}/${kpiId}`, kpiData);
  }

  // Calcular KPI
  calculateKpi(kpiId: string, variables: any): Observable<any> {
    return this.http.post(`${URL_KPIS}/calculate/${kpiId}`, variables);
  }

  // Eliminar un KPI
  deleteKpi(kpiId: string): Observable<any> {
    return this.http.delete(`${URL_KPIS}/${kpiId}`);
  }
}
