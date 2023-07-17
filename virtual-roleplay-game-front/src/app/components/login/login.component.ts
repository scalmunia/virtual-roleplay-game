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
    } catch (error) {
      this.error = error as Error;
    }
  }
}
