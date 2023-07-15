import { Injectable } from '@angular/core';
import { headersWithAuth } from '../config/fetch.config';

@Injectable({
  providedIn: 'root',
})
export class CharactersListService {
  private URL = 'http://localhost:3000/api/characters';

  async getCharactersList() {
    try {
      const response = await fetch(this.URL, {
        method: 'GET',
        headers: headersWithAuth,
      });

      const result = await response.json();

      if (response.status === 200) {
        return result;
      }
    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
