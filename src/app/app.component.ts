import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'events-videogame-frontend';
  constructor(private auth: AuthService) { }
  ngOnInit() {
    if (this.auth['isAuthenticated']()) {
      this.auth.loadProfile().subscribe({
        next: () => console.log('Roles actuales:', this.auth.getUserRoles()),
        error: err => console.error('Error cargando perfil:', err)
      });
    }
  }
}
