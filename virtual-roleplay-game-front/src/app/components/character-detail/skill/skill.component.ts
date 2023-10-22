import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { calcAbilityModifier } from 'src/app/models/Character/calcAbilityBonus';
import { ABILITIES_TRANSLATION, ABILITY_SCORES_AND_MODIFIERS, PROFICIENCY_BONUS_ACORDING_TO_LEVEL, SKILLS_LIST } from 'src/app/models/Character/character.constants';

@Component({
  selector: 'vrg-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})

export class SkillComponent {
  @Input() skillId: string = '';
  @Input() control?: FormControl<boolean>;
  @Input() character: any | null = null;
  proficiencyModifier: number = 2;

  convertSkill(ability?: string): string {

    if (!ability) return '';
    const translationSkill = ABILITIES_TRANSLATION[ability] || ability;
    const abreviateSkill = translationSkill.slice(0, 3);
    return abreviateSkill;
  }

  calculateBonus(ability?: string, characterLevel?: number): string | number {
    if (!ability) return '';
    if (!characterLevel) return 0;
    const abilityValue = this.character ? this.character[ability] : 0;
    const abilityModifier = ABILITY_SCORES_AND_MODIFIERS[abilityValue as keyof typeof ABILITY_SCORES_AND_MODIFIERS];
    const proficiencyBonus = PROFICIENCY_BONUS_ACORDING_TO_LEVEL[characterLevel] || 0;
    const bonus = abilityModifier + proficiencyBonus
    return bonus;
  }

  get ability() {
    const skill = SKILLS_LIST.find(skill => skill.id === this.skillId);
    return skill?.ability;
  }
}

