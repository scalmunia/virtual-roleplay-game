import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CharactersListService {

  private URL = 'http://localhost:3000/api/characters';

  constructor() { }

  async getCharactersList(token: string) {
    try {
      const response = await fetch(this.URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(res => res.json());

      return response.result;

    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
