import { Injectable } from '@angular/core';
import { Character, ICharacter } from '../models/Character/Character';
import { fetcher } from '../config/fetch.config';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private URL = 'api/character';

  async create(data: Omit<ICharacter, '_id'>, token: string) {
    const character = new Character();
    character.create(data);

    const response = await fetcher(this.URL, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}
