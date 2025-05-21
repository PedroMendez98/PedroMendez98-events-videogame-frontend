import { Component } from '@angular/core';
import { Reservation } from '../../../core/models/reservation.model';
import { ReservationService } from '../../../core/services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.scss'
})

export class MyReservationsComponent {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}
  
  ngOnInit(): void {
    this.reservationService.getMyReservations().subscribe({
      next: (data) => this.reservations = data,
      error: () => alert('Error cargando reservas')
    });
  }

  cancel(reservationId: number) {
    this.reservationService.cancelReservation(reservationId).subscribe({
      next: () => {
        alert('Reserva cancelada');
        this.ngOnInit(); // Recargar lista
      },
      error: (err) => {
        alert(err.error.message || 'No se pudo cancelar la reserva');
      }
    });
  }
}
