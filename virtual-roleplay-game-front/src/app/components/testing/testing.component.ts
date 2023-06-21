import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})

export class TestingComponent {
  error: string = '';
  
  ngOnInit() {
    const user = new User("Hola", "hola@hola.com", "hola");
    const character = new Character();
    try {
      character.create({
        name: 'Bruenor',
        class: 'fighter',
        abilities: {
          charisma: 19,
          constitution: 12341234,
          dexterity: 12341234,
          intelligence: 12341234,
          strength: 12341234,
          wisdom: 12341234,
        }
      });
    } catch(error) {
      this.error = (error as Error).message;
    }
    console.log(character)
  
    // console.log(user.name); 
    // console.log(user.email);
    // console.log(user.password);
  }

}
