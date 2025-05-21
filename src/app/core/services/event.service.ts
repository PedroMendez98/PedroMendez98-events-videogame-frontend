// src/app/core/services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Event {
  id: number;
  name: string;
  game: string;
  location: string;
  date: string;
  maxPlayers: number;
  currentPlayers: number;
  // opcional, si lo devuelves con reservas:
  reservations?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly baseUrl = `${environment.apiUrl}/tournaments`;

  constructor(private http: HttpClient) {}

  /** Trae todos los eventos (torneos) */
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  /** Trae un evento por su ID */
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  /** Crea un evento nuevo */
  createEvent(payload: Partial<Event>): Observable<Event> {
    return this.http.post<Event>(this.baseUrl, payload);
  }

  /** Actualiza un evento existente */
  updateEvent(id: number, payload: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, payload);
  }

  /** Elimina un evento */
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
