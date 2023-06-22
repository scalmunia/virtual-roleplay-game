import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character/Character';
import { calcAbilityModifier } from 'src/app/models/Character/calcAbilityBonus';
import { calcMaximunLife } from 'src/app/models/Character/calcMaximunLife';
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
    // console.log(user.name); 
    // console.log(user.email);
    // console.log(user.password);
    
    const character = new Character();
    try {
      character.create({
        name: 'Bruenor',
        class: 'fighter',
        abilities: {
          strength: 12,
          dexterity: 12,
          constitution: 9,
          intelligence: 9,
          wisdom: 9,
          charisma: 9
        }
      });
    } catch(error) {
      this.error = (error as Error).message;
    }
    console.log(character);

    const modifier = calcAbilityModifier(7);
    console.log('MODIFICADOR', modifier);  

    const maximunLife = calcMaximunLife('bard', 14);
    console.log('VIDA MAXIMA', maximunLife);
  }
}
