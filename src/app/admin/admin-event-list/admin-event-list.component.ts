import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { Router } from '@angular/router';

interface Event {
  id: number;
  name: string;
  game: string;
  location: string;
  date: string;
  maxPlayers: number;
  currentPlayers: number;
}

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.scss']
})
export class AdminEventListComponent implements OnInit {
  events: Event[] = [];
  loading = true;

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: data => { this.events = data; this.loading = false; },
      error: () => { this.loading = false; alert('Error cargando eventos'); }
    });
  }

  editEvent(id: number) {
    this.router.navigate(['/admin/events', id, 'edit']);
  }

  deleteEvent(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este evento?')) return;
    this.eventService.deleteEvent(id).subscribe({
      next: () => this.loadEvents(),
      error: () => alert('Error al eliminar')
    });
  }
}