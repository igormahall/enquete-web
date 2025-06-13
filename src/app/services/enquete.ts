import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enquete } from '../models/enquete.model';

@Injectable({
  providedIn: 'root'
})
export class EnqueteService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {
  }

  getEnquetes(): Observable<Enquete[]> {
    // URL com crases (`)
    return this.http.get<Enquete[]>(`${this.apiUrl}/enquetes/`);
  }

  getEnqueteById(id: number): Observable<Enquete> {
    // CORRIGIDO: URL com crases (`)
    return this.http.get<Enquete>(`${this.apiUrl}/enquetes/${id}/`);
  }

  votar(enqueteId: number, opcaoId: number, participantId: string): Observable<Enquete> {
    const payload = {
      id_opcao: opcaoId,
      id_participante: participantId
    };
    // CORRIGIDO: URL com crases (`)
    return this.http.post<Enquete>(`${this.apiUrl}/enquetes/${enqueteId}/votar/`, payload);
  }

  createEnquete(data: { titulo: string, opcoes_input: string[] }): Observable<Enquete> {
    // CORRIGIDO: URL com crases (`)
    return this.http.post<Enquete>(`${this.apiUrl}/enquetes/`, data);
  }
}
