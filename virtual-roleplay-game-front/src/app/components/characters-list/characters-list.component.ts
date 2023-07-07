import { Component, OnInit } from '@angular/core';
import { CharactersListService } from 'src/app/services/characters-list.service';
import { Character } from 'src/app/models/Character/Character';

@Component({
  selector: 'vrg-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})

export class CharactersListComponent implements OnInit {
  list: Array<Character> = [];

  constructor(private charactersList: CharactersListService) {}
  
  ngOnInit(): void {
    this.getList();
  }
  
  async getList() {
    try {
      const token = localStorage.getItem('token');
      const response = await this.charactersList.getCharactersList(token as string);
      this.list = response;

      return this.list;

    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
