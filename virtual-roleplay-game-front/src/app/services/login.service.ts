import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private URL = 'http://localhost:3000/api/user/login';

  constructor() {}

  // async loginUser(email: string, password: string) {
  async loginUser(user: Pick<User, 'email' & 'password'>) {
    try {
      // const user = {
      //   email: email,
      //   password: password
      // }

      const response = await fetch(this.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(res => res.json());
      
      if (response.code === '200') {
        //Guardar token en localStorage
        console.log('TOKEN', response.token);
        localStorage.setItem('token', response.token); 

        return true;
      } else {
        return false;
      }
      
      // return response.result;

    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
