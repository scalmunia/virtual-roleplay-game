import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  private URL = 'http://localhost:3000/api/user/register';

  async registerUser(user: User) {
    try {
      const response = await fetch(this.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      await response.json();
              
      if (response.status === 200) {
        return true;
      } else {
        console.log('ha fallado')
        return false;
      }

    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
