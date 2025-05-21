import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament } from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/tournaments`);
  }
  

  reserveTournament(tournamentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservations`, { tournamentId });
  }
}
