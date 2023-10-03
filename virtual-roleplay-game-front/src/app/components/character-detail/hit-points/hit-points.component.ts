import { Component, Input } from '@angular/core';
import { calcMaximunLife } from 'src/app/models/Character/calcMaximunLife';

@Component({
  selector: 'vrg-hit-points',
  templateUrl: './hit-points.component.html',
  styleUrls: ['./hit-points.component.css']
})

export class HitPointsComponent {
  @Input() character: any | null = null;

  // Almacena el modificador calculado
  modifier: number | string = '';

  ngOnChanges() {
    this.character.characterClass && this.character.constitution ? this.modifier = calcMaximunLife(this.character) : this.character;
  }
}
