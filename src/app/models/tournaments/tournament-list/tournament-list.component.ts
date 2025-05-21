import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../core/services/tournament.service';
import { Tournament } from '../../../core/models/tournament.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ReservationService } from '../../../core/services/reservation.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html'
})
export class TournamentListComponent implements OnInit {
  tournaments: Tournament[] = [];
  reserving: number | null = null;

  constructor(private tournamentService: TournamentService, private router: Router, private authService: AuthService, private reservationService: ReservationService) {}

  ngOnInit(): void {

      this.tournamentService.getTournaments().subscribe({
        next: (data) => this.tournaments = data,
        error: () => alert('Error cargando torneos')
      });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  reserve(tournamentId: number) {
    this.reservationService.reserve(tournamentId).subscribe({
      next: () => {
        alert('Reserva exitosa');
        this.ngOnInit(); // Recargar lista con datos actualizados
      },
      error: (err) => {
        alert(err.error.message || 'No se pudo realizar la reserva');
      }
    });
  }
  
}
