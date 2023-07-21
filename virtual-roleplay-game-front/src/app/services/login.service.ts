import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { fetcher } from '../config/fetch.config';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private URL = 'api/user/login';

  async loginUser(user: Pick<User, 'email' & 'password'>) {
    const response = await fetcher(this.URL, {
      method: 'POST',
      body: JSON.stringify(user)
    });
    const { token } = await response.json();

    //Guardar token en localStorage
    localStorage.setItem('token', token);
  }
}
