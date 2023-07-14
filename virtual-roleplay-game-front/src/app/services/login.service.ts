import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private URL = 'http://localhost:3000/api/user/login';

  async loginUser(user: Pick<User, 'email' & 'password'>) {
    try {
      const response = await fetch(this.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const result = await response.json();

      if (response.status === 200) {
        //Guardar token en localStorage
        console.log('TOKEN', result.token);
        localStorage.setItem('token', result.token); 

        return true;
      } else {
        console.log('entra por el else')
        return false;
      }

    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
