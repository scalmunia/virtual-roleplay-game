import { Component, Input } from '@angular/core';
import { ABILITIES_TRANSLATION } from 'src/app/models/Character/character.constants';

@Component({
  selector: 'vrg-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})

export class SkillComponent {
  @Input() index: number = 0;
  @Input() ability: string = '';
  @Input() name: string = '';
  @Input() bonus: number = 0;
  checked: any = null;

  convertSkill(ability: string): string {
    const translationSkill = ABILITIES_TRANSLATION[ability] || ability;
    const abreviateSkill = translationSkill.slice(0, 3);
    return abreviateSkill;
  }
}

