import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { fetcher } from '../config/fetch.config';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private URL = 'http://localhost:3000/api/user/register';

  async registerUser(user: User) {
    await fetcher(this.URL, {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }
}
