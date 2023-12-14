import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Abilities } from 'src/app/models/Character/Character';
import { calcAbilityModifier } from 'src/app/models/Character/calcAbilityBonus';
import { ABILITIES_TRANSLATION, PROFICIENCY_BONUS_ACORDING_TO_LEVEL, SKILLS_LIST } from 'src/app/models/Character/character.constants';

@Component({
  selector: 'vrg-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})

export class SkillComponent {
  @Input() skillId: string = '';
  @Input() control?: FormControl<boolean>;
  @Input() character: any | null = null;
  @Output() onBonusClick: EventEmitter<number> = new EventEmitter();

  proficiencyModifier: number = 2;

  convertSkill(ability?: string): string {

    if (!ability) return '';
    const translationSkill = ABILITIES_TRANSLATION[ability] || ability;
    const abreviateSkill = translationSkill.slice(0, 3);
    return abreviateSkill;
  }

  calcSkillModifier(control: FormControl<boolean>): number {
    if (!this.character) return 0;

    const ability = this.ability;
    const abilityBonus = calcAbilityModifier(this.character, ability as keyof Abilities);

    const hasProficiency = control?.value
    const proficiencyBonus = PROFICIENCY_BONUS_ACORDING_TO_LEVEL[this.character?.level];

    return hasProficiency ? abilityBonus + proficiencyBonus : abilityBonus;
  };

  get ability() {
    const skill = SKILLS_LIST.find(skill => skill.id === this.skillId);
    return skill?.ability;
  }
}
