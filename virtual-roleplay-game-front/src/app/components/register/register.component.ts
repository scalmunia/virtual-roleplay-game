import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User'
import { RegisterService } from 'src/app/services/register.service'

@Component({
  selector: 'vrg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: FormGroup; 

  constructor(private registerService: RegisterService, private router: Router) {  
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+.\[a-z0-9.-]+[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    console.log(this.form);

    const user: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.registerService.registerUser(user);
    console.log('-----USUARIO REGISTRADO CORRECTAMENTE');

    // Si todo ok, redirigir al login
    // this.router.navigate(['/login']);
  }
}
