import { Injectable } from '@angular/core';
import { fetcher } from '../config/fetch.config';

@Injectable({
  providedIn: 'root'
})

export class NavService {
  private URL = 'api/user';

  async getUser() {
    const response = await fetcher(this.URL);
    const result = await response.json();

    return result;
  }

  async getCharacter(id: string) {
    const url = `api/character/${id}`;
    const response = await fetcher(url);
    const result = await response.json();

    return result;
  }
}
