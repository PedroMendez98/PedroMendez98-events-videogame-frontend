import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isAuthenticated = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Observable que emite `true` mientras profileSubject!==null
    this.isAuthenticated$ = this.authService.profile$.pipe(
      map(p => p !== null)
    );
    // Observable que emite `true` cuando el perfil incluye ADMIN
    this.isAdmin$ = this.authService.profile$.pipe(
      map(p => p?.roles.includes('ADMIN') ?? false)
    );

    this.authService.profile$.subscribe(profile => {
      this.isAuthenticated = !!profile;
    })

  }
  logout(): void {
    this.authService.logout();
  }
}