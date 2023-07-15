import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private URL = 'http://localhost:3000/api/user/register';

  async registerUser(user: User) {
    const response = await fetch(this.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const { error } = await response.json();

    if (response.status !== 200) throw new Error(error);
  }
}
