import { Component, Input } from '@angular/core';
import { ICharacter } from 'src/app/models/Character/Character';
import { calcMaximunLife } from 'src/app/models/Character/calcMaximunLife';

@Component({
  selector: 'vrg-hit-points',
  templateUrl: './hit-points.component.html',
  styleUrls: ['./hit-points.component.css']
})

export class HitPointsComponent {
  @Input() character: ICharacter | null = null;

  calcMaximunLife = calcMaximunLife;
}
