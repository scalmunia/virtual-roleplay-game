import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private URL = 'http://localhost:3000/api/user/register';

  constructor(private router: Router) {}

  async registerUser(user: User) {
    try {
      const response = await fetch(this.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(res => res.json());

      console.log(response.result);
      return response.result;

    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
