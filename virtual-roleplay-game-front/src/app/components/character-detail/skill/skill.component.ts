import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Abilities } from 'src/app/models/Character/Character';
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

  calcAbilityModifier(ability?: string): number {
    if (!ability) return 0;
    return calcAbilityModifier(this.character, ability as keyof Abilities);
  };

  // calculateBonus(ability?: string, characterLevel?: number): number {
  //   if (!ability) return 0;
  //   if (!characterLevel) return 0;

  //   const abilityValue = this.character ? this.character[ability] : 0;
  //   const abilityModifier = ABILITY_SCORES_AND_MODIFIERS[abilityValue as keyof typeof ABILITY_SCORES_AND_MODIFIERS];

  //   let finalModifier = abilityModifier;

  //   this.character.equipment.forEach((equipment) => {
  //     equipment.attributes.forEach((attribute) => {
  //       if (attribute.name === ability) {
  //         finalModifier += attribute.bonus;
  //       }
  //     });
  //   });

  //   if (this.control && this.control.value) {
  //     const proficiencyBonus = PROFICIENCY_BONUS_ACORDING_TO_LEVEL[characterLevel] || 0;
  //     const bonus = finalModifier + proficiencyBonus;

  //     return bonus;
  //   } else {
  //     return finalModifier;
  //   }
  // }

  get ability() {
    const skill = SKILLS_LIST.find(skill => skill.id === this.skillId);
    return skill?.ability;
  }
}

