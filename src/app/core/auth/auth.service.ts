import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtResponse } from './jwt-response.interface';
import { UserProfile } from './user-profile.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  token$ = this.tokenSubject.asObservable();

  private roles: string[] = [];
  private profileSubject = new BehaviorSubject<UserProfile | null>(null);
  profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<JwtResponse> {
    const body = { username, password };
    return this.http.post<JwtResponse>(`${environment.apiUrl}/login`, body).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.tokenSubject.next(res.token);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<JwtResponse> {
    const body = { username, email, password };
    return this.http.post<JwtResponse>('/api/register', body).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.tokenSubject.next(res.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.roles = [];
    this.profileSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  loadProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.apiUrl}/users/me`).pipe(
      tap(profile => {
        this.profileSubject.next(profile);
        this.roles = profile.roles || [];
      })
    );
  }

  getUserRoles(): string[] {
    return this.roles;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setProfile(profile: UserProfile) {
    this.profileSubject.next(profile);
  }
  
}
