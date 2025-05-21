import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  showLogin = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  divColor = '#ffffff'; // Cambia esto dinámicamente

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Definir formularios
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Si viene con ?login=true, activar el modo login
    this.route.queryParamMap.subscribe(params => {
      this.showLogin = params.get('login') === 'true';
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  toggle(show: boolean): void {
    this.showLogin = show;
    this.submitted = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: jwt => {
        localStorage.setItem('token', jwt.token);

        this.authService.loadProfile().subscribe({
          next: profile => {
            this.authService.setProfile(profile);
            this.router.navigate(['/']); // Redirige a home
          },
          error: err => {
            console.error('Error cargando perfil:', err);
            this.errorMessage = 'No se pudo cargar el perfil.';
          }
        });
      },
      error: err => {
        console.error('Error en login:', err);
        this.errorMessage = 'Credenciales inválidas o error de servidor.';
      }
    });
  }
}
