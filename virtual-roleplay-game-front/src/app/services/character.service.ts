import { Injectable } from '@angular/core';
import { Character, ICharacter } from '../models/Character/Character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private URL = 'http://localhost:3000/api/character';

  async create(data: ICharacter, token: string) {
    try {
      const character = new Character();
      character.create(data);
  
      const response = await fetch(this.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
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
