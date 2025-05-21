import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getMyReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/my-reservations`);
  }

  reserve(tournamentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve/${tournamentId}`, {});
  }

  cancelReservation(reservationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cancel/${reservationId}`);
  }  

}
