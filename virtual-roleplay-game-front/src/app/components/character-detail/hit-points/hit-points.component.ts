import { Component, Input } from '@angular/core';
import { ICharacter } from 'src/app/models/Character/Character';
import { calcMaximunLife } from 'src/app/models/Character/calcMaximunLife';

@Component({
  selector: 'vrg-hit-points',
  templateUrl: './hit-points.component.html',
  styleUrls: ['./hit-points.component.css']
})

export class HitPointsComponent {
  @Input() character: any | null = null;

  // calcMaximunLife = calcMaximunLife;

  // Almacena el modificador calculado
  modifier: number | string = '';

  ngOnChanges() {
    console.log('this.character', this.character)

    this.character.characterClass && this.character.constitution ? this.modifier = calcMaximunLife(this.character) : this.character;
  }
}
