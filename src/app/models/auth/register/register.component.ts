import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get rf() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const { username, email, password } = this.registerForm.value;
    this.auth.register(username, email, password).subscribe({
      next: () => {
        // tras registrarse volvemos al login
        this.router.navigate(['/auth'], { queryParams: { login: true } });
      },
      error: err => {
        alert(err.error?.message || 'Error en el registro');
      }
    });
  }
}
