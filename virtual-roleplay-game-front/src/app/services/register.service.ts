import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  private URL = 'http://localhost:3000/api/user/register';

  constructor() {}

  async registerUser(user: User) {
    try {
      const response = await fetch(this.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(res => res.json());
              
      if (response.code === '200') {
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
