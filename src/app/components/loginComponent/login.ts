import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authentication = inject(AuthService);
  private router = inject(Router);

  loginResquest = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  errorMessage: string | null = null; // Agrega variable para el mensaje de error

  onSubmit() {
    this.errorMessage = null; // Limpia el mensaje antes de intentar login
    
    this.authentication.login(this.loginResquest.value.email||'', this.loginResquest.value.password||'').subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate([this.getUserHome()]); // Redirige a la página de inicio después del login exitoso
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Usuario o contraseña incorrectos intente nuevamente.'; // Mensaje de error
      }
    });
  }

  getUserHome(): string {
    const roles = this.authentication.getUserRoles(); 
    
    if (roles.includes('ADMINISTRATOR')) {
      return '/admin';
    }
    return '/user';
  }
}
