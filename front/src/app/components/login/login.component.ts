import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'vrg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  showPassword: boolean = false;
  error: Error | null = null;

  constructor(private loginService: LoginService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void { }

  async onSubmit() {
    const user: Pick<User, 'email' & 'password'> = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    try {
      await this.loginService.loginUser(user);
      this.router.navigate(['/characters']);
    } catch (error: any) {
      this.error = error as Error;

      const errorMessage = await error.json();
      if (error.status === 400) {
        this.error = errorMessage.error

        // Elimina y vuelve a agregar la clase error para reiniciar la animación
        const errorElement = document.querySelector('.error') as any;
        if (errorElement) {
          errorElement.classList.remove('error');
          void errorElement.offsetWidth; // Forzar un nuevo layout para reiniciar la animación
          errorElement.classList.add('error');
        }
      }
    }
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método para obtener el tipo de input dinámicamente
  getPasswordFieldType() {
    return this.showPassword ? 'text' : 'password';
  }
}
