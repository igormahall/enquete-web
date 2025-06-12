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
    return this.http.get<Enquete[]>(`${this.apiUrl}/enquetes/`);
  }

  getEnqueteById(id: number): Observable<Enquete> {
    return this.http.get<Enquete>(`${this.apiUrl}/enquetes/${id}/`);
  }

  votar(enqueteId: number, opcaoId: number): Observable<Enquete> {
    const payload = {
      id_opcao: opcaoId,
      id_participante: this.getOrCreateParticipantId()
    };
    return this.http.post<Enquete>(`${this.apiUrl}/enquetes/${enqueteId}/votar/`, payload);
  }

  private getOrCreateParticipantId(): string {
    let participantId = localStorage.getItem('participantId');
    if (!participantId) {
      participantId = `participant-${Date.now()}-${Math.random()}`;
      localStorage.setItem('participantId', participantId);
    }
    return participantId;
  }

  createEnquete(data: { titulo: string, opcoes_input: string[] }): Observable<Enquete> {
    return this.http.post<Enquete>(`${this.apiUrl}/enquetes/`, data);
  }
}
