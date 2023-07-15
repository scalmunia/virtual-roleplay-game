import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private loginService: LoginService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+.[a-z0-9.-]+[a-z]{2,3}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    console.log(this.form);

    const user: Pick<User, 'email' & 'password'> = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    const response = await this.loginService.loginUser(user);
    // const response = await this.loginService.loginUser(this.form.value.email, this.form.value.password);
    if (response) {
      console.log('-----USUARIO LOGUEADO CORRECTAMENTE');
      this.router.navigate(['/characters']);
      // this.router.navigate(['/character']);
    } else {
      console.log('ERROR EN LA RESPUESTA');
    }
  }
}
