import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { calcAbilityModifier } from 'src/app/models/Character/calcAbilityBonus';

@Component({
  selector: 'vrg-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.css']
})
export class AbilityComponent {
  @Input() ability: string = '';
  @Input() form!: FormGroup;
  @Input() control: FormControl = new FormControl();

  calcAbilityModifier = calcAbilityModifier;
}
