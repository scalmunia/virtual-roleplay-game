import { Injectable } from '@angular/core';
import { Character, ICharacter } from '../models/Character/Character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private URL = 'http://localhost:3000/api/character';

  async create(data: ICharacter, token: string) {
    const character = new Character();
    character.create(data);
    console.log(character);
      
    const response = await fetch(this.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    });

    console.log('RESPONSE', response);
    
    const result = await response.json();
    console.log('RESULT', result);
  }
}
