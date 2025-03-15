import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoriaService {
  private apiUrl = 'http://seu-api-url.com/mercadorias';

  constructor(private http: HttpClient) {}

  obterMercadorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  adicionarMercadoria(mercadoria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, mercadoria);
  }

  desativarMercadoria(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { ativo: false });
  }

  excluirMercadoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}