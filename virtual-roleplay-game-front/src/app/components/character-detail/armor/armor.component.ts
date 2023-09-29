import { Component, Input } from '@angular/core';
import { ICharacter } from 'src/app/models/Character/Character';
import { calcArmor } from 'src/app/models/Character/calcArmor';

@Component({
  selector: 'vrg-armor',
  templateUrl: './armor.component.html',
  styleUrls: ['./armor.component.css']
})
export class ArmorComponent {
  @Input() character: ICharacter | null = null;

  calcArmor = calcArmor;
}
