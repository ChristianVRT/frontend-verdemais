import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MercadoriaResponse } from '../types/mercadoria-response.type';

@Injectable({
  providedIn: 'root'
})
export class MercadoriaService {
  private apiUrl = 'http://localhost:8080/mercadoria';

  constructor(private http: HttpClient) {}

  obterMercadorias(): Observable<MercadoriaResponse[]> {
    const token = sessionStorage.getItem('auth-token') || '';
    return this.http.get<MercadoriaResponse[]>(`${this.apiUrl}`, {
      headers: { Authorization: token }
    });
  }

  adicionarMercadoria(mercadoria: MercadoriaResponse): Observable<MercadoriaResponse> {
    const token = sessionStorage.getItem('auth-token') || '';
    return this.http.post<MercadoriaResponse>(`${this.apiUrl}`, mercadoria, {
      headers: { Authorization: token }
    });
  }

  atualizarMercadoria(id: number, mercadoria: MercadoriaResponse): Observable<MercadoriaResponse> {
    const token = sessionStorage.getItem('auth-token') || '';
    return this.http.put<MercadoriaResponse>(`${this.apiUrl}/${id}`, mercadoria, {
      headers: { Authorization: token }
    });
  }

  excluirMercadoria(id: number): Observable<any> {
    const token = sessionStorage.getItem('auth-token') || '';
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { Authorization: token }
    });
  }
}