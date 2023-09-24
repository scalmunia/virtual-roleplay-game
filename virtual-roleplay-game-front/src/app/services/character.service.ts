import { Injectable } from '@angular/core';
import { Character, ICharacter } from '../models/Character/Character';
import { fetcher } from '../config/fetch.config';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private URL = 'api/character';

  async getOne(id: string) {
    const url = `${this.URL}/${id}`;
    const response = await fetcher(url);
    const result = await response.json();

    return result;
  }

  async save(data: Omit<ICharacter, '_id'>, id?: ICharacter['_id']) {
    const character = new Character();
    // console.log('------------------------------------------')
    // console.log('------------------data', data)
    character.create(data);

    if (id) {
      const url = `${this.URL}/${id}`;
      await fetcher(url, {
        method: 'PUT',
        body: JSON.stringify(data)
      });

      return;
    }

    await fetcher(this.URL, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async deleteOne(id: string) {
    const url = `${this.URL}/${id}`;
    await fetcher(url, {
      method: 'DELETE'
    });

    return;
  }
}
