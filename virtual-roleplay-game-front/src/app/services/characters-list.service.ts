import { Injectable } from '@angular/core';
import { fetcher } from '../config/fetch.config';

@Injectable({
  providedIn: 'root',
})

export class CharactersListService {
  private URL = 'api/characters';

  async getCharactersList() {
    const response = await fetcher(this.URL);
    const result = await response.json();

    return result;
  }
}
