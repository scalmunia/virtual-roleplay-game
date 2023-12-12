import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'vrg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  confirmPassword: string = '';
  error: Error | null = null;

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+.[a-z0-9.-]+[a-z]{2,3}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  ngOnInit(): void { }

  async onSubmit() {
    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      this.error = new Error('Las contraseñas no coinciden');
      return;
    }

    const user: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    try {
      await this.registerService.registerUser(user);
      this.router.navigate(['/login']);
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
}
