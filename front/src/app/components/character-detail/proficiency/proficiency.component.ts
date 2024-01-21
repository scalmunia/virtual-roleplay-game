import { Component, Input } from '@angular/core';
import { PROFICIENCY_BONUS_ACORDING_TO_LEVEL } from 'src/app/models/Character/character.constants';

@Component({
  selector: 'vrg-proficiency',
  templateUrl: './proficiency.component.html',
  styleUrls: ['./proficiency.component.css']
})

export class ProficiencyComponent {
  @Input() character: any | null = null;
  modifier: number = 2;

  ngOnChanges() {
    this.character.level ? this.modifier = PROFICIENCY_BONUS_ACORDING_TO_LEVEL[this.character.level] : this.character;
  }
}
